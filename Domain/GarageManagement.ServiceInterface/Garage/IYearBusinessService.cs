using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IYearBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOYear>>> GetAllAsync();

        Task<DataResult<DTOYear>> GetYearByIdAsync(int id);

        Task<DataResult<List<DTOYear>>> GetYearsByModelAsync(int modelId);

        Task<DataResult<IPagedListResult<DTOYear>>> GetYearsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOYear>> CreateAsync(DTOYear yearDTO);

        Task<DataResult<DTOYear>> EditAsync(DTOYear yearDTO);

        Task<DataResult<bool>> DeleteAsync(int id);
    }
}
