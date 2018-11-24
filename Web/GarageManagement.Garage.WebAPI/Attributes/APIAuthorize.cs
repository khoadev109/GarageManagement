using System;
using System.Net;
using System.Web;
using System.Linq;
using System.Web.Http;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web.Http.Controllers;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using Microsoft.Owin.Security.OAuth;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.Garage.Entity.Enum;
using Common.Core.WebAPI.Authentication.Utilities;
using static Common.Core.WebAPI.Authentication.TokenConfiguration;

namespace GarageManagement.Garage.WebAPI.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class APIAuthorizeAttribute : AuthorizeAttribute
    {
        private JObject _result = null;

        public APIAuthorizeAttribute() { }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            IEnumerable<Claim> claims = GetClaims(actionContext);

            if (!SetUnauthorizedResultInvalidAuthorizationHeader(actionContext) ||
                !SetUnauthorizedResultEmptyToken(actionContext, claims) ||
                !SetUnauthorizedResultUnauthenticated(actionContext) ||
                !SetUnauthorizedResultUserIsNotGrantedPermission(actionContext, claims))
            {
                return;
            }
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.Forbidden,
                Content = new StringContent(_result.ToString())
            };            
        }

        private bool SetUnauthorizedResultEmptyToken(HttpActionContext actionContext, IEnumerable<Claim> claims)
        {
            if (claims == null || claims.ToList().Count == 0)
            {
                //CookiesHelper.CLEAR_COOKIES(AppSetting.WarehouseUser);
                actionContext.Request.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                _result = GetUnauthorizedResult("Unauthorized. Token is invalid", "logout");
                HandleUnauthorizedRequest(actionContext);
                return false;
            }
            return true;
        }

        private bool SetUnauthorizedResultInvalidAuthorizationHeader(HttpActionContext actionContext)
        {
            var authenticationHeader = actionContext.Request.Headers.Authorization;

            if (authenticationHeader == null || authenticationHeader.Scheme != OAuthDefaults.AuthenticationType || 
                string.IsNullOrEmpty(authenticationHeader.Parameter))
            {
                _result = GetUnauthorizedResult("Unauthorize. Empty or authentication type is not Bearer", "logout");
                HandleUnauthorizedRequest(actionContext);
                return false;
            }
            return true;
        }

        private bool SetUnauthorizedResultUnauthenticated(HttpActionContext actionContext)
        {
            bool isAuthenticated = actionContext.RequestContext.Principal.Identity.IsAuthenticated;
            if (!isAuthenticated)
            {
                _result = GetUnauthorizedResult("Unauthorized. Not login", "logout");
                HandleUnauthorizedRequest(actionContext);
                return false;
            }
            return true;
        }

        private bool SetUnauthorizedResultUserIsNotGrantedPermission(HttpActionContext actionContext, IEnumerable<Claim> claims)
        {
            var dependencyRequestScope = actionContext.Request.GetDependencyScope();
            var rightHandlerBusinessService = dependencyRequestScope.GetService(typeof(IRightHandlerBusinessService)) as IRightHandlerBusinessService;

            int moduleId = GetModuleIdFromRequestController(actionContext);
            int rightId = GetRightIdFromRequestMethod(actionContext);

            if (moduleId != 0 && rightId != 0)
            {
                var userIdClaim = claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                var roleClaim = claims.SingleOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                int userId = !string.IsNullOrEmpty(userIdClaim) ? int.Parse(userIdClaim) : 0;
                int roleId = !string.IsNullOrEmpty(roleClaim) ? int.Parse(roleClaim) : 0;

                bool isAuthorized = rightHandlerBusinessService.CheckPermissionOfUser(userId, roleId, moduleId, rightId);
                if (!isAuthorized)
                {
                    _result = GetUnauthorizedResult("Unauthorized. You don't have permission to access this resource", statusCode: HttpStatusCode.Forbidden);
                    HandleUnauthorizedRequest(actionContext);
                    return false;
                }
            }
            return true;
        }
        
        private IEnumerable<Claim> GetClaims(HttpActionContext actionContext)
        {
            var authenticationHeader = actionContext.Request.Headers.Authorization;
            string token = authenticationHeader?.Parameter;

            if (string.IsNullOrEmpty(token))
                return null;

            var claimsIdentity = GetClaimsIdentityByToken(token);
            if (claimsIdentity == null || !claimsIdentity.IsAuthenticated)
                return null;

            return claimsIdentity.Claims;
        }

        private ClaimsIdentity GetClaimsIdentityByToken(string token)
        {
            var principal = JwtTokenHandle.GetPrincipal(token, TokenAudienceSecret);
            var identity = principal?.Identity as ClaimsIdentity;
            return identity;
        }

        private int GetModuleIdFromRequestController(HttpActionContext actionContext)
        {
            string controllerName = actionContext.ControllerContext.ControllerDescriptor.ControllerName;
            ModuleEnum module = (ModuleEnum)Enum.Parse(typeof(ModuleEnum), controllerName);
            return module.GetHashCode();
        }

        private int GetRightIdFromRequestMethod(HttpActionContext actionContext)
        {
            string requestMethod = actionContext.Request.Method.Method;

            if (requestMethod == HttpMethod.Get.Method)
                return RightEnum.VIEW.GetHashCode();
            else if (requestMethod == HttpMethod.Post.Method)
                return RightEnum.ADD.GetHashCode();
            else if (requestMethod == HttpMethod.Put.Method)
                return RightEnum.EDIT.GetHashCode();
            else if (requestMethod == HttpMethod.Delete.Method)
                return RightEnum.DELETE.GetHashCode();
            else return 0;
        }

        private JObject GetUnauthorizedResult(string message, string redirect = "", HttpStatusCode statusCode = HttpStatusCode.Unauthorized)
        {
            return JObject.FromObject(new UnauthorizedResult
            {
                Success = false,
                StatusCode = statusCode.GetHashCode(),
                Message = message,
                Redirect = redirect
            });
        }
    }
}
