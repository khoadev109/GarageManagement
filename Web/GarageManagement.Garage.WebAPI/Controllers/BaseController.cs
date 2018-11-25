using Common.Core.WebAPI.Controllers;
using GarageManagement.Garage.WebAPI.Builder.Service;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class BaseController : WebApiController
    {
        protected DependencyParameter dependency;
        protected readonly IServiceBuilder serviceBuilder;

        public BaseController()
        {
            serviceBuilder = new ServiceBuilder();
        }
    }
}
