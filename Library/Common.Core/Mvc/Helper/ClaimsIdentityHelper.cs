using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace Common.Core.Mvc.Helper
{
    public static class ClaimsIdentityHelpers
    {
        public static T GetClaim<T>(this IIdentity identity, string name)
        {
            if (identity is ClaimsIdentity)
            {
                var claimsIdentity = (ClaimsIdentity)identity;
                var claim = claimsIdentity.Claims.FirstOrDefault(x => x.Type == name);
                return (T)Convert.ChangeType(claim?.Value, typeof(T));
            }

            return default(T);
        }

        //public static List<Claim> SetClaims<T>()
        //{

        //}
    }
}
