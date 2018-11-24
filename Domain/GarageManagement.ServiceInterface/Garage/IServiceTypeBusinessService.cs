using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IServiceTypeBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOServiceType>>> GetAllServiceTypesAsync();
        Task<DataResult<List<DTOServiceType>>> GetParentServiceTypesAsync();
        Task<DataResult<DTOServiceType>> GetServiceTypeByIdAsync(int id);
        Task<DataResult<IPagedListResult<DTOServiceType>>> GetServiceTypesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                        CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOServiceType>> CreateServiceTypeAsync(DTOServiceType serviceTypeDTO);
        Task<DataResult<DTOServiceType>> EditServiceTypeAsync(DTOServiceType serviceTypeDTO);
        Task<DataResult<bool>> DeleteServiceTypeAsync(int id);
    }
}
