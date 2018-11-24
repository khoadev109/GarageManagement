using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IEmployeeBusinessService
    {
        Task<DataResult<DTOEmployee>> GetEmployeeByIdAsync(string employeeId);

        Task<DataResult<List<DTOEmployee>>> GetAllEmployeesAsync();

        Task<DataResult<IPagedListResult<DTOEmployee>>> GetEmployeesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));
                
        Task<DataResult<DTOEmployee>> CreateEmployeeAsync(DTOEmployee employeeDTO);

        Task<DataResult<DTOEmployee>> EditEmployeeAsync(DTOEmployee employeeDTO);

        Task<DataResult<bool>> DeleteEmployeeAsync(string employeeId);
    }
}
