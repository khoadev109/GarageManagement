using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IServiceBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOService>>> GetAllServicesAsync();
        Task<DataResult<DTOService>> GetServiceByIdAsync(string id);
        Task<DataResult<IPagedListResult<DTOService>>> GetServicesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOService>> CreateServiceAsync(DTOService serviceDTO);
        Task<DataResult<DTOService>> EditServiceAsync(DTOService serviceDTO);
        Task<DataResult<bool>> DeleteServiceAsync(string serviceId);
    }
}
