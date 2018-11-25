using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface ICustomerTypeBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOCustomerType>>> GetAllAsync();
        Task<DataResult<DTOCustomerType>> GetByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOCustomerType>>> GetCustomerTypesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                            CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOCustomerType>> CreateCustomerTypeAsync(DTOCustomerType customerTypeDTO);
        Task<DataResult<DTOCustomerType>> EditCustomerTypeAsync(DTOCustomerType customerTypeDTO);
        Task<DataResult<bool>> DeleteCustomerTypeAsync(int id);
    }
}
