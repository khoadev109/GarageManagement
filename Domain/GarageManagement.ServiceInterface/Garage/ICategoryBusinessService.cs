using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface ICategoryBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOCategory>>> GetAllAsync();
        Task<DataResult<List<DTOCategory>>> GetParentCategoriesAsync();
        Task<DataResult<DTOCategory>> GetCategoryByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOCategory>>> GetCategoriesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                               CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOCategory>> CreateCategoryAsync(DTOCategory categoryDTO);
        Task<DataResult<DTOCategory>> EditCategoryAsync(DTOCategory categoryDTO);
        Task<DataResult<bool>> DeleteCategoryAsync(int id);
    }
}
