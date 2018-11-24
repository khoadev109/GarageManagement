using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class ModelController : BaseController
    {
        public ModelController(IModelBusinessService modelService, IStyleBusinessService styleService, IManufacturerBusinessService manufacturerService)
        {
            serviceBuilder.BuildModelService(modelService);
            serviceBuilder.BuildStyleService(styleService);
            serviceBuilder.BuildManufacturerService(manufacturerService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterModelsWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.GetModelsWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.GetAllModelsAsync());
        }

        public async Task<IHttpActionResult> Get(int id = 0)
        {
            return await ExecuteServiceReturnHttpResult(() => dependency.ModelService.GetModelByIdAsync(id), GetListDependencyOfSingleModel);
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOModel modelDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.CreateModelAsync(modelDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOModel modelDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.EditModelAsync(modelDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ModelService.DeleteModelAsync(id), false);
        }

        private async Task<DTOModel> GetListDependencyOfSingleModel()
        {
            var outputTarget = new DTOModel();

            outputTarget.Styles = await ExecuteServiceReturnDataResult(() => dependency.StyleService.GetAllAsync());
            outputTarget.Manufacturers = await ExecuteServiceReturnDataResult(() => dependency.ManufacturerService.GetAllAsync());
            
            return await Task.FromResult(outputTarget);
        }
    }
}
