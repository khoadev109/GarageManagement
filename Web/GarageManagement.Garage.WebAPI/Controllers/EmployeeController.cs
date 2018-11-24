using System;
using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class EmployeeController : BaseController
    {
        public EmployeeController(IBranchBusinessService branchService, IEmployeeBusinessService employeeService)
        {
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildEmployeeService(employeeService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterEmployeesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.EmployeeService.GetEmployeesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Get(string employeeId = "")
        {
            return await ExecuteServiceReturnHttpResult(() => dependency.EmployeeService.GetEmployeeByIdAsync(employeeId), GetListDependencyOfSingleEmployee);
        }

        public async Task<IHttpActionResult> GetAll()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.EmployeeService.GetAllEmployeesAsync());
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOEmployee employeeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.EmployeeService.CreateEmployeeAsync(employeeDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOEmployee employeeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.EmployeeService.EditEmployeeAsync(employeeDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string employeeId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.EmployeeService.DeleteEmployeeAsync(employeeId), false);
        }

        private async Task<DTOEmployee> GetListDependencyOfSingleEmployee()
        {
            var outputTarget = new DTOEmployee();
            outputTarget.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
            return await Task.FromResult(outputTarget);
        }
    }
}
