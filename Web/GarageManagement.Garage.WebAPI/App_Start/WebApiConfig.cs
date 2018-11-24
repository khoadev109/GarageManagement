using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ModelBinding;
using System.Web.Http.ModelBinding.Binders;
using GarageManagement.Garage.WebAPI.ModelBinder;

namespace GarageManagement.Garage.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable Cors Cross Origin
            var cors = new EnableCorsAttribute("*", "*", "*");
            cors.SupportsCredentials = true;
            config.EnableCors(cors);

            // Model Providers
            var quotationModelProvider = new SimpleModelBinderProvider(typeof(QuotationParameter), new QuotationModelBinder());
            var customerModelProvider = new SimpleModelBinderProvider(typeof(CustomerParameter), new CustomerModelBinder());
            config.Services.Insert(typeof(ModelBinderProvider), 0, quotationModelProvider);
            config.Services.Insert(typeof(ModelBinderProvider), 1, customerModelProvider);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}"
            );
        }
    }
}
