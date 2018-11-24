using System;
using System.IO;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using Common.Core.Extension;
using System.Security.Claims;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;

namespace Common.Core.Mvc
{
    public abstract class BaseController : Controller
    {
        public bool IsAjax
        {
            get
            {
                return Request.IsAjaxRequest();
            }
        }

        public int UserId
        {
            get
            {
                return User.Identity.GetUserId<int>();
            }
        }

        protected Dictionary<string, string> SEOInformation;

        /// <summary>
        /// The action is successful, and returns a json object for updating UI
        /// </summary>
        /// <returns></returns>
        protected JsonResult JsonSuccess(string message, object data = null)
        {
            var jsonResultObject = new JsonResultObject { success = true, message = message, data = data };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The action is successful, and returns a dictionary of htmls for each container (div id, table id...)
        /// </summary>
        /// <returns></returns>
        protected JsonResult JsonSuccess(string message, Dictionary<string, string> htmlForIds)
        {
            var jsonResultObject = new JsonResultObject { success = true, message = message, htmlForIds = htmlForIds };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The action is successful and we need to reload the page.
        /// </summary>
        /// <returns></returns>
        protected JsonResult JsonSuccess(string message, bool reload)
        {
            var jsonResultObject = new JsonResultObject { success = true, message = message, reload = reload };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The action is successful and we need to redirect to a specified url.
        /// </summary>
        /// <returns></returns>
        //protected JsonResult JsonSuccess(string message, string redirect)
        //{
        //    var jsonResultObject = new JsonResultObject { success = true, message = message, redirect = redirect };
        //    return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        //}

        protected JsonResult JsonError(string message, object data = null)
        {
            var jsonResultObject = new JsonResultObject { success = false, message = message, data = data };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        protected JsonResult JsonError(string message, Dictionary<string, string> htmlForIds)
        {
            var jsonResultObject = new JsonResultObject { success = false, message = message, htmlForIds = htmlForIds };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        protected JsonResult JsonError(string message, bool reload)
        {
            var jsonResultObject = new JsonResultObject { success = false, message = message, reload = reload };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        protected JsonResult JsonError(string message, string redirect)
        {
            var jsonResultObject = new JsonResultObject { success = false, message = message, redirect = redirect };
            return Json(jsonResultObject, JsonRequestBehavior.AllowGet);
        }

        protected ContentResult ErrorContent(string error)
        {
            //window.location.href = '/'
            return Content($@"<script>console.log('{error}'); </script>", "text/html");
        }

        protected string DecodeUrl(string value)
        {
            return HttpUtility.UrlDecode(value);
        }

        protected void EmbbedSEO()
        {
            ViewBag.Title = SEOInformation["Title"];
            ViewBag.Description = SEOInformation["Description"];
        }
        
        public string GetPartialView(string partialPath, object model, string htmlFieldPrefix = null)
        {
            if (string.IsNullOrEmpty(partialPath))
                partialPath = ControllerContext.RouteData.GetRequiredString("action");

            ViewData.Model = model;

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, partialPath);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, htmlFieldPrefix == null ? ViewData : new ViewDataDictionary(ViewData)
                {
                    TemplateInfo = new TemplateInfo() { HtmlFieldPrefix = htmlFieldPrefix }
                }, TempData, sw);

                // copy model state items to the html helper 
                foreach (var item in viewContext.Controller.ViewData.ModelState)
                {
                    if (!viewContext.ViewData.ModelState.Keys.Contains(item.Key))
                    {
                        viewContext.ViewData.ModelState.Add(item);
                    }
                }

                viewResult.View.Render(viewContext, sw);

                return sw.GetStringBuilder().ToString().Trim();
            }
        }

        protected bool LogIn(Dictionary<string, string> claimValues, bool rememberMe = false)
        {
            try
            {
                var claims = claimValues.BindClaims();
                if (claims.Any())
                {
                    Authenticate(claims, rememberMe);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        protected void LogOut()
        {
            HttpContext.Session.Clear();
            AuthenticationManager.SignOut();
            //string[] cookiesName = HttpContext.Request.Cookies.AllKeys;
            //foreach (var cookie in cookiesName)
            //{
            //    HttpContext.Response.Cookies[cookie].Expires = DateTime.Now.AddDays(-1);
            //}
            //AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        /// <summary>
        /// - SignOut every external cookie
        /// - Bind Claims Identity
        /// - SignIn
        /// - Set Claims Principal for user
        /// </summary>
        /// <param name="claims"></param>
        private void Authenticate(List<Claim> claims, bool rememberMe)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var claimsIdentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties()
            {
                IsPersistent = rememberMe
            }, claimsIdentity);
            HttpContext.User = AuthenticationManager.AuthenticationResponseGrant.Principal;
        }
    }

    public static class ClaimExtension
    {
        public static List<Claim> BindClaims(this IDictionary<string, string> dictClaimValues)
        {
            var claims = new List<Claim>();
            dictClaimValues.ForEach(claim =>
            {
                claims.Add(new Claim(claim.Key, claim.Value));
            });
            return claims.ToList();
        }
    }

    internal class JsonResultObject
    {
        public bool success { get; set; }
        public string message { get; set; }
        /// <summary>
        /// json data for quick update.
        /// </summary>
        public object data { get; set; }
        /// <summary>
        /// reload the page.
        /// </summary>
        public bool reload { get; set; }
        /// <summary>
        /// redirect to another page.
        /// </summary>
        public string redirect { get; set; }
        /// <summary>
        /// contains html view for ids that we need to update.
        /// </summary>
        public Dictionary<string, string> htmlForIds { get; set; }
    }    
}
