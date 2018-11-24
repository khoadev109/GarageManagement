using GarageManagement.Garage.Entity.Entities;
using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Garage;
using System.Threading.Tasks;
using System.Web.Http;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class RoleRightModuleController : BaseController
    {
        public RoleRightModuleController(IRoleRightModuleBusinessService roleRightModuleService)
        {
            serviceBuilder.BuildRoleRightModuleService(roleRightModuleService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetByRole(int roleId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.RoleRightModuleService.GetByRole(roleId));
        }

        public async Task<IHttpActionResult> GetByUser(int userId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.RoleRightModuleService.GetByUser(userId));
        }

        public async Task<IHttpActionResult> Post([FromBody]RoleRightModule roleRightModule)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.RoleRightModuleService.Create(roleRightModule), false);
        }                
    }
}
