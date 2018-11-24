using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Garage;
using System.Threading.Tasks;
using System.Web.Http;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class ModuleController : BaseController
    {
        public ModuleController(IModuleBusinessService moduleService)
        {
            serviceBuilder.BuildModuleService(moduleService);
            dependency = serviceBuilder.Dependency;
        }
        
        public async Task<IHttpActionResult> Get()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModuleService.Get());
        }
    }
}
