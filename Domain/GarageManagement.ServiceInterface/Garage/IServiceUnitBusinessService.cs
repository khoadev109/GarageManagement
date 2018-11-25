using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IServiceUnitBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOServiceUnit>>> GetAllAsync();
        Task<DataResult<DTOServiceUnit>> GetByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOServiceUnit>>> GetServiceUnitWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));
        Task<DataResult<DTOServiceUnit>> CreateAsync(DTOServiceUnit accessaryUnitDTO);
        Task<DataResult<DTOServiceUnit>> EditAsync(DTOServiceUnit accessaryUnitDTO);
        Task<DataResult<bool>> DeleteAsync(int serviceUnitId);
    }
}
