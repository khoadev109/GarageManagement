using Owin;
using System;
using AutoMapper;
using StructureMap;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using GarageManagement.ServiceInterface.Garage;
using Common.Core.WebAPI.Authentication;
using GarageManagement.Garage.WebAPI.Provider;
using Microsoft.Owin.Security.DataHandler.Encoder;
using static Common.Core.WebAPI.Authentication.TokenConfiguration;

namespace GarageManagement.Garage.WebAPI
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string publicClientId { get; private set; }

        public void ConfigureOAuth(IAppBuilder app, IContainer container)
        {
            var expireTime = publicClientId = "self";
            var mapper = container.GetInstance<IMapper>();
            var userService = container.GetInstance<IUserBusinessService>();
            var refreshTokenService = container.GetInstance<IRefreshTokenBusinessService>();

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/token"),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),

                Provider = new APIOAuthProvider(userService, publicClientId),
                RefreshTokenProvider = new APIRefreshTokenProvider(mapper, refreshTokenService),

                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(TokenExpireTimeMinutes),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true,
                AccessTokenFormat = new JWTFormat(TokenIssuer)
            };
            app.UseOAuthAuthorizationServer(OAuthOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }

        private void ConfigureJWTConsumption(IAppBuilder app)
        {
            var issuer = TokenIssuer;
            string audienceId = TokenAudienceId;
            byte[] audienceSecret = TextEncodings.Base64Url.Decode(TokenAudienceSecret);

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { audienceId },
                IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
                {
                    new SymmetricKeyIssuerSecurityKeyProvider(issuer, audienceSecret)
                }
            });
        }
    }
}
