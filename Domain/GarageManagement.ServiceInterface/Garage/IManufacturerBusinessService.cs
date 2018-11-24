using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IManufacturerBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOManufacturer>>> GetAllAsync();
        Task<DataResult<DTOManufacturer>> GetManufacturerByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOManufacturer>>> GetManufacturersWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));
        Task<DataResult<DTOManufacturer>> CreateManufacturerAsync(DTOManufacturer manufacturerDTO);
        Task<DataResult<DTOManufacturer>> EditManufacturerAsync(DTOManufacturer manufacturerDTO);
        Task<DataResult<bool>> DeleteManufacturerAsync(int id);
    }
}
