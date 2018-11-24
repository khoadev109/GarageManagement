using System;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class AccessaryController : BaseController
    {
        public AccessaryController(IAccessaryBusinessService accessaryService, IBranchBusinessService branchService, 
                                   IAccessaryUnitBusinessService accessaryUnitService, ICategoryBusinessService categoryService)
        {
            serviceBuilder.BuildAccessaryService(accessaryService);
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildAccessaryUnitService(accessaryUnitService);
            serviceBuilder.BuildCategoryService(categoryService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterAccessariesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryService.GetAccessariesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryService.GetAllAccessariesAsync());
        }

        public async Task<IHttpActionResult> Get(string id = "")
        {
            return await ExecuteServiceReturnHttpResult(() => dependency.AccessaryService.GetAccessaryByIdAsync(id), GetListDependencyOfSingleAccessary);
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOAccessary accessaryDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryService.CreateAccessaryAsync(accessaryDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody] DTOAccessary accessaryDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryService.EditAccessaryAsync(accessaryDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string accessaryId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryService.DeleteAccessaryAsync(accessaryId), false);
        }

        private async Task<DTOAccessary> GetListDependencyOfSingleAccessary()
        {
            var outputTarget = new DTOAccessary();

            outputTarget.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
            outputTarget.Units = await ExecuteServiceReturnDataResult(() => dependency.AccessaryUnitService.GetAllAsync());
            outputTarget.Categories = await ExecuteServiceReturnDataResult(() => dependency.CategoryService.GetAllAsync());

            return await Task.FromResult(outputTarget);
        }
    }
}
