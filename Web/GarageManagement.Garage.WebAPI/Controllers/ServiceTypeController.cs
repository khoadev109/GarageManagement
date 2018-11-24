using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class ServiceTypeController : BaseController
    {
        public ServiceTypeController(IServiceTypeBusinessService publicServiceType)
        {
            serviceBuilder.BuildServiceTypeService(publicServiceType);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterServiceTypesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.GetServiceTypesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAllServiceTypes()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.GetAllServiceTypesAsync());
        }

        public async Task<IHttpActionResult> GetParentServiceTypes()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.GetParentServiceTypesAsync());
        }

        public async Task<IHttpActionResult> Get(int serviceTypeId = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.GetServiceTypeByIdAsync(serviceTypeId));
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOServiceType serviceTypeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.CreateServiceTypeAsync(serviceTypeDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOServiceType serviceTypeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.EditServiceTypeAsync(serviceTypeDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ServiceTypeService.DeleteServiceTypeAsync(id), false);
        }
    }
}
