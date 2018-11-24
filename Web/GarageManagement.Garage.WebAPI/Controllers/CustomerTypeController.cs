using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class CustomerTypeController : BaseController
    {
        public CustomerTypeController(ICustomerTypeBusinessService customerTypeService)
        {
            serviceBuilder.BuildCustomerTypeService(customerTypeService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterCustomerTypesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerTypeService.GetCustomerTypesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Get(int customerTypeId = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerTypeService.GetByIdAsync(customerTypeId));
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOCustomerType customerTypeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerTypeService.CreateCustomerTypeAsync(customerTypeDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody] DTOCustomerType customerTypeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerTypeService.EditCustomerTypeAsync(customerTypeDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int customerTypeId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerTypeService.DeleteCustomerTypeAsync(customerTypeId), false);
        }
    }
}
