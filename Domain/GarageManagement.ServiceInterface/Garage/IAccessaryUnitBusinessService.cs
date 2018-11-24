using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IAccessaryUnitBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOAccessaryUnit>>> GetAllAsync();
        Task<DataResult<DTOAccessaryUnit>> GetByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOAccessaryUnit>>> GetAccessaryWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));
        Task<DataResult<DTOAccessaryUnit>> CreateAsync(DTOAccessaryUnit accessaryUnitDTO);
        Task<DataResult<DTOAccessaryUnit>> EditAsync(DTOAccessaryUnit accessaryUnitDTO);
        Task<DataResult<bool>> DeleteAsync(int accessaryUnitId);
    }
}
