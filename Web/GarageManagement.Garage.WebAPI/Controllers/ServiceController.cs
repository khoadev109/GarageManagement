using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class ServiceController : BaseController
    {
        public ServiceController(IBranchBusinessService branchService, IServiceBusinessService publicService, 
                                 IServiceTypeBusinessService publicServiceType, IServiceUnitBusinessService unitService)
        {
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildPublicService(publicService);
            serviceBuilder.BuildServiceTypeService(publicServiceType);
            serviceBuilder.BuildServiceUnitService(unitService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterServicesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.PublicService.GetServicesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAll()
        {            
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.PublicService.GetAllServicesAsync());
        }

        public async Task<IHttpActionResult> Get(string id = "")
        {
            return await ExecuteServiceReturnHttpResult(() => dependency.PublicService.GetServiceByIdAsync(id), GetListDependencyOfSingleService);
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOService serviceDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.PublicService.CreateServiceAsync(serviceDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOService serviceDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.PublicService.EditServiceAsync(serviceDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string id)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.PublicService.DeleteServiceAsync(id), false);
        }

        private async Task<DTOService> GetListDependencyOfSingleService()
        {
            var outputTarget = new DTOService();

            outputTarget.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
            outputTarget.Units = await ExecuteServiceReturnDataResult(() => dependency.ServiceUnitService.GetAllAsync());
            outputTarget.ServiceTypes = await ExecuteServiceReturnDataResult(() => dependency.ServiceTypeService.GetAllServiceTypesAsync());

            return await Task.FromResult(outputTarget);
        }
    }
}
