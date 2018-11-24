using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class GarageController : BaseController
    {
        public GarageController(IGarageBusinessService garageService)
        {
            serviceBuilder.BuildGarageService(garageService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetGarageInformation()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.GarageService.GetGarageSettingInformationAsync());
        }

        public async Task<IHttpActionResult> PutUpdateGarageInformation([FromBody]DTOGarage garageDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.GarageService.CreateOrUpdateGarageAsync(garageDTO), false);
        }
    }
}
