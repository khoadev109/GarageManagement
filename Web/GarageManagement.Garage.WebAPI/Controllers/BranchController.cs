using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class BranchController : BaseController
    {
        public BranchController(IBranchBusinessService branchService)
        {
            serviceBuilder.BuildBranchService(branchService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterBranchesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.GetBranchesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.GetAllAsync());
        }

        public async Task<IHttpActionResult> Get(string branchId = "")
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.GetByIdAsync(branchId));
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOBranch branchDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.CreateBranchAsync(branchDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody] DTOBranch branchDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.EditBranchAsync(branchDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string branchId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.BranchService.DeleteBranchAsync(branchId), false);
        }
    }
}
