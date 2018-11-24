using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class AccessaryUnitController : BaseController
    {
        public AccessaryUnitController(IAccessaryUnitBusinessService accessaryUnitService)
        {
            serviceBuilder.BuildAccessaryUnitService(accessaryUnitService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.GetAllAsync());
        }

        public async Task<IHttpActionResult> GetFilterAccessaryUnitWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.GetAccessaryWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Get(int id = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.GetByIdAsync(id));
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOAccessaryUnit accessaryUnitDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.CreateAsync(accessaryUnitDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOAccessaryUnit accessaryUnitDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.EditAsync(accessaryUnitDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int accessaryUnitId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.AccessaryUnitService.DeleteAsync(accessaryUnitId), false);
        }
    }
}
