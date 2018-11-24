using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Garage;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class RoleController : BaseController
    {
        public RoleController(IRoleBusinessService roleService)
        {
            serviceBuilder.BuildRoleService(roleService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> Get()
        {
            var role = GetClaimValueByType(x => x.Type == ClaimTypes.Role);
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.RoleService.Get(int.Parse(role)));
        }
    }
}
