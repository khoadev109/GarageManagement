using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class CommonController : BaseController
    {
        public CommonController(IManufacturerBusinessService manufacturerService, IStyleBusinessService styleService,
                                IModelBusinessService modelService, IYearBusinessService yearService)
        {
            serviceBuilder.BuildManufacturerService(manufacturerService);
            serviceBuilder.BuildStyleService(styleService);
            serviceBuilder.BuildModelService(modelService);
            serviceBuilder.BuildYearService(yearService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetAllManufacturer()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.GetAllAsync());
        }

        public async Task<IHttpActionResult> GetModelByManufacturer(int manufacturerId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.GetModelsByManufacturerAsync(manufacturerId));
        }

        public async Task<IHttpActionResult> GetYearByModel(int modelId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.GetYearsByModelAsync(modelId));
        }
    }
}
