using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class YearController : BaseController
    {
        public YearController(IYearBusinessService yearService, IModelBusinessService modelService)
        {
            serviceBuilder.BuildModelService(modelService);
            serviceBuilder.BuildYearService(yearService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetYearsWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.GetYearsWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.GetAllAsync());
        }

        public async Task<IHttpActionResult> Get(int id)
        {
            return await ExecuteServiceReturnHttpResult(() => dependency.YearService.GetYearByIdAsync(id), GetListDependencyOfSingleYear);
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOYear yearDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.CreateAsync(yearDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOYear yearDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.EditAsync(yearDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.YearService.DeleteAsync(id), false);
        }

        private async Task<DTOYear> GetListDependencyOfSingleYear()
        {
            var outputTarget = new DTOYear();
            outputTarget.Models = await ExecuteServiceReturnDataResult(() => dependency.ModelService.GetAllModelsAsync());
            return await Task.FromResult(outputTarget);
        }
    }
}
