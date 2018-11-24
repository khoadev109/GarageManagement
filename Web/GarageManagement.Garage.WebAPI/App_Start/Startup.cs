using Owin;
using StructureMap;
using Microsoft.Owin;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Infrastructure.DependencyResolution;

[assembly: OwinStartup(typeof(GarageManagement.Garage.WebAPI.Startup))]

namespace GarageManagement.Garage.WebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Configure the db context to use a single instance per request
            app.CreatePerOwinContext(GarageDbContext.Create);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            // Initialize StructureMap
            IContainer container = IoC.Initialize();
            container.AssertConfigurationIsValid();
            
            // Configure the application for OAuth based flow
            ConfigureOAuth(app, container);
            ConfigureJWTConsumption(app);

            var config = new HttpConfiguration();
            config.DependencyResolver = new StructureMapWebApiDependencyResolver(container);

            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            WebApiConfig.Register(config);

            app.UseWebApi(config);
        }
    }
}
