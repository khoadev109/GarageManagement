using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IBranchBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOBranch>> GetByIdAsync(string id);
        Task<DataResult<List<DTOBranch>>> GetAllAsync();
        Task<DataResult<IPagedListResult<DTOBranch>>> GetBranchesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOBranch>> CreateBranchAsync(DTOBranch branchDTO);
        Task<DataResult<DTOBranch>> EditBranchAsync(DTOBranch branchDTO);
        Task<DataResult<bool>> DeleteBranchAsync(string id);
    }
}
