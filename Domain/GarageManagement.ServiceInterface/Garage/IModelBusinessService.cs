using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IModelBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOModel>>> GetModelsByManufacturerAsync(int styleId);

        Task<DataResult<List<DTOModel>>> GetAllModelsAsync();
        Task<DataResult<DTOModel>> GetModelByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOModel>>> GetModelsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOModel>> CreateModelAsync(DTOModel modelDTO);
        Task<DataResult<DTOModel>> EditModelAsync(DTOModel modelDTO);
        Task<DataResult<bool>> DeleteModelAsync(int modelId);
    }
}
