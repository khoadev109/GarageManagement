using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface ICustomerExchangeBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOCustomerExchange>> GetCustomerExchangeByCustomerAndCarIdAsync(string customerId, string carId = null);
        Task<DataResult<DTOCustomerExchange>> GetCustomerWithOwnedCarAsync(string customerId);
        Task<DataResult<List<DTOCustomerExchange>>> GetCustomerAndOwnedCarsAsync();
        Task<DataResult<IPagedListResult<DTOCustomerExchange>>> GetCustomersInTransactionWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                                        CancellationToken cancellationToken = default(CancellationToken));
        Task<DataResult<DTOCustomerExchange>> CreateAsync(DTOCustomerExchange customerDTO);
        Task<DataResult<DTOCustomerExchange>> EditAsync(DTOCustomerExchange customerDTO);
        Task<DataResult<DTOCustomerExchange>> CreateCarOwnerAsync(string carId, string customerId);
        Task<DataResult<DTOCustomerExchange>> UpdateCarOwnerAsync(string customerId, string carId, int customerExchangeId);
        Task<DataResult<DTOCustomerExchange>> AttachNewCustomerToCustomerExchangeAsync(string customerId);
        Task<DataResult<bool>> DeleteAsync(string carId, string customerId);
    }
}
