﻿using System;
using Vendare.Error;
using System.Web.Mvc;
using System.Collections.Specialized;

namespace Common.Core.Mvc.Attribute
{
    public class CatchErrorExceptionAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            if (filterContext.ExceptionHandled || !filterContext.HttpContext.IsCustomErrorEnabled)
            //|| new HttpException(null, filterContext.Exception).GetHttpCode() != 500)
            {

                var exception = filterContext.Exception;
                var actionName = filterContext.RouteData.Values["action"].ToString();
                var controllerName = filterContext.RouteData.Values["controller"].ToString();
                var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);

                // if the request is AJAX return Json else view.
                if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    filterContext.Result = new JsonResult
                    {
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                        Data = new ErrorJsonObjectResult
                        {
                            data = null,
                            success = false,
                            message = filterContext.Exception.Message
                        }
                    };
                }
                else
                {
                    filterContext.Result = new ViewResult
                    {
                        ViewName = "~/Views/Shared/Error.cshtml",
                        MasterName = "~/Views/Shared/_Layout.cshtml",
                        ViewData = new ViewDataDictionary(model),
                        TempData = filterContext.Controller.TempData
                    };
                }

                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.StatusCode = 500;
                filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;

                LogErrorToFile(filterContext.Exception, actionName, controllerName);
            }
        }

        private void LogErrorToFile(Exception exception, string action, string controller)
        {
            var detail = new NameValueCollection
            {
                ["Action"] = action,
                ["Controller"] = controller,
                ["Exeption"] = exception?.InnerException?.Message
            };
            new LoggableException(exception, detail);
        }
    }

    public class ErrorJsonObjectResult
    {
        public object data { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
    }
}
