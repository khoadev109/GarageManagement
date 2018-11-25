using System;
using System.Linq;
using System.Threading;
using System.Collections.Generic;
using System.Security.Claims;

namespace Common.Core.WebAPI.Authentication.Utilities
{
    public static class ClaimExtension
    {
        public static List<Claim> GetClaims()
        {
            ClaimsPrincipal claimsPrincipal = Thread.CurrentPrincipal as ClaimsPrincipal;
            ClaimsIdentity claimsIdentity = (ClaimsIdentity)claimsPrincipal.Identity;
            return claimsIdentity.Claims.ToList();
        }

        public static string GetClaimValueByType(Func<Claim, bool> predicate)
        {
            var claims = GetClaims();
            var claimValue = claims.FirstOrDefault(predicate)?.Value;
            return claimValue;
        }
    }
}
