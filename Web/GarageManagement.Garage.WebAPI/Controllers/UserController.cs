using GarageManagement.ServiceInterface.Garage;
using System.Threading.Tasks;
using System.Web.Http;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class UserController : BaseController
    {
        public UserController(IUserBusinessService userService)
        {
            serviceBuilder.BuildUserService(userService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> Get()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.UserService.Get());
        }
    }
}
