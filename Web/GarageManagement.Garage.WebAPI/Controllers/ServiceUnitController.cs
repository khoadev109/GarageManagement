using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class ServiceUnitController : BaseController
    {
        public ServiceUnitController(IServiceUnitBusinessService publicUnitService)
        {
            serviceBuilder.BuildServiceUnitService(publicUnitService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.GetAllAsync());
        }

        public async Task<IHttpActionResult> GetFilterServiceUnitWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.GetServiceUnitWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Get(int id = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.GetByIdAsync(id));
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOServiceUnit serviceUnitDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.CreateAsync(serviceUnitDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOServiceUnit serviceUnitDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.EditAsync(serviceUnitDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceUnitService.DeleteAsync(id), false);
        }
    }
}
