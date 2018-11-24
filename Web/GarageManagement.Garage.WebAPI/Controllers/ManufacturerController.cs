using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class ManufacturerController : BaseController
    {
        public ManufacturerController(IManufacturerBusinessService manufacturerService)
        {
            serviceBuilder.BuildManufacturerService(manufacturerService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetManufacturersWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.GetManufacturersWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.GetAllAsync());
        }

        public async Task<IHttpActionResult> Get(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.GetManufacturerByIdAsync(id));
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOManufacturer manufacturerDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.CreateManufacturerAsync(manufacturerDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody] DTOManufacturer manufacturerDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.EditManufacturerAsync(manufacturerDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.ManufacturerService.DeleteManufacturerAsync(id), false);
        }
    }
}
