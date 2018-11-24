using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface ICarBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOCar>> GetCarByIdAsync(string carId);
        Task<DataResult<DTOCar>> GetSpecifyCarByCustomerIdAsync(string customerId);
        Task<DataResult<List<DTOCar>>> GetOwnedCarsOfSpecifyCustomerAsync(string customerId);
        Task<DataResult<IPagedListResult<DTOCar>>> GetCarsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                    CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOCar>> CreateAsync(DTOCar carDTO);
        Task<DataResult<DTOCar>> EditAsync(DTOCar carDTO);
        Task<DataResult<bool>> DeleteAsync(string carId);
    }
}
