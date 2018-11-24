using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace Common.Core.Mvc.Attribute
{
    public class UserAuthenticatedAttribute : FilterAttribute, IAuthenticationFilter
    {
        public void OnAuthentication(AuthenticationContext context)
        { }
        
        public void OnAuthenticationChallenge(AuthenticationChallengeContext context)
        {
            var user = context.HttpContext.User;
            if (user == null || !user.Identity.IsAuthenticated)
            {
                context.Result = new HttpUnauthorizedResult("Page is not authorized.");
            }
        }
    }
}
