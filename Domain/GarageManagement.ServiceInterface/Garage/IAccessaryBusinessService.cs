using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IAccessaryBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOAccessary>>> GetAllAccessariesAsync();
        Task<DataResult<DTOAccessary>> GetAccessaryByIdAsync(string id);
        Task<DataResult<IPagedListResult<DTOAccessary>>> GetAccessariesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));
        Task<DataResult<DTOAccessary>> CreateAccessaryAsync(DTOAccessary accessaryDTO);
        Task<DataResult<DTOAccessary>> EditAccessaryAsync(DTOAccessary accessaryDTO);
        Task<DataResult<bool>> DeleteAccessaryAsync(string accessaryId);
    }
}
