using System;
using System.Web;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.Extension.Encode;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.OAuth;
using Common.Core.WebAPI.Authentication;
using GarageManagement.ServiceInterface.Garage;
using static Common.Core.Extension.AttributeExtensions;

namespace GarageManagement.Garage.WebAPI.Provider
{
    public class APIOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public readonly IUserBusinessService _userService;

        public APIOAuthProvider(IUserBusinessService userService, string publicClientId)
        {
            _userService = userService;
            publicClientId = publicClientId ?? throw new ArgumentNullException("publicClientId");
            _publicClientId = publicClientId;
        }

        public APIOAuthProvider(string publicClientId)
        {
            publicClientId = publicClientId ?? throw new ArgumentNullException("publicClientId");
            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                var user = new User();
                var pwd = EncodingExtensions.Vigenere.Decrypt(context.Password);
                var authenticatedUserDTO = await _userService.CheckValidAuthenticationAndGetUserIsValidAsync(context.UserName, pwd);
                if (!authenticatedUserDTO.HasErrors)
                {
                    user.Id = authenticatedUserDTO.Target.UserId.ToString();
                    user.UserName = authenticatedUserDTO.Target.UserName;
                    user.Email = authenticatedUserDTO.Target.Email;
                    user.RoleId = authenticatedUserDTO.Target.RoleId;
                    user.RoleName = authenticatedUserDTO.Target.RoleName;
                    user.FullName = authenticatedUserDTO.Target.FullName;
                    user.PhoneNumber = authenticatedUserDTO.Target.Phone;
                }
                else
                {
                    context.SetError(TokenMessageType.Invalid.ToDefaultValue(), "The user name or password is incorrect.");
                    return;
                }

                var claims = CreateResponseClaims(user);
                ClaimsIdentity oAuthIdentity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                AuthenticationProperties properties = CreateProperties(user);

                AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
                context.Validated(ticket);
                LogIn(claims);
            }
            catch (Exception ex)
            {
                context.SetError(TokenMessageType.Error.ToDefaultValue(), "Critical Error logging in");
            }
        }

        public override async Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var userId = context.Ticket.Properties.Dictionary["userId"];

            if (string.IsNullOrEmpty(userId))
            {
                context.SetError(TokenMessageType.Invalid.ToDefaultValue(), "User Id not set.");
                return;
            }

            var result = await _userService.GetUserByIdAsync(int.Parse(userId));
            if (!result.HasErrors)
            {
                if (result.Target == null)
                {
                    context.SetError(TokenMessageType.Invalid.ToDefaultValue(), "User not found.");
                    return;
                }
            }
            else
            {
                context.SetError(TokenMessageType.Error.ToDefaultValue(), "Error occurs. Please check in server.");
                return;
            }

            // Change auth ticket for refresh token requests
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);
            newIdentity.AddClaim(new Claim("newClaim", "newValue"));

            var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
            context.Validated(newTicket);

            return;
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
                context.AdditionalResponseParameters.Add(property.Key, property.Value);

            return Task.FromResult<object>(null);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            //context.Request.Body.Position = 0;
            //var reader = new StreamReader(context.Request.Body);
            //var body = reader.ReadToEnd();
            return base.ValidateTokenRequest(context);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null) 
                context.Validated();
            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");
                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                    context.Validated();
            }
            return Task.FromResult<object>(null);
        }

        public AuthenticationProperties CreateProperties(User user)
        {
            IDictionary<string, string> properties = new Dictionary<string, string>
            {
                ["userId"] = user.Id,
                ["email"] = user.Email,
                ["phone"] = user.PhoneNumber,
                ["roleId"] = user.RoleId.ToString(),
                ["role"] = user.RoleName,
                ["userName"] = user.UserName,
                ["fullName"] = user.FullName
            };

            return new AuthenticationProperties(properties);
        }

        private List<Claim> CreateResponseClaims(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, Convert.ToString(user.Id)),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Surname, user.FullName)
            };

            return claims;
        }

        protected bool LogIn(List<Claim> claimValues, bool rememberMe = false)
        {
            try
            {
                if (claimValues.Any())
                {
                    Authenticate(claimValues, rememberMe);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
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
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie, DefaultAuthenticationTypes.ApplicationCookie);
            var claimsIdentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties()
            {
                IsPersistent = rememberMe
            }, claimsIdentity);
            HttpContext.Current.User = AuthenticationManager.AuthenticationResponseGrant.Principal;
        }
    }
}
