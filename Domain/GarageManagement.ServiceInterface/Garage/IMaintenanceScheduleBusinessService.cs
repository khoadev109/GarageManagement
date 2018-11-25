using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IMaintenanceScheduleBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOTemplateSchedule>>> GetQueuedItemsPrepareToSendAsync();
        Task<DataResult<List<DTOTemplateSchedule>>> GetErrorItemsToRetrySendAsync();
        Task<DataResult<List<DTOTemplateSchedule>>> GetErrorItemsRetriedSendButFailAsync();
        Task<DataResult<List<DTOTemplateSchedule>>> GetProcessingItemsAsync();
        Task<DataResult<List<DTOTemplateSchedule>>> GetInformedItemsAsync();
        Task<DataResult<DTOMaintenanceSchedule>> CreateAsync(DTOMaintenanceSchedule maintenanceScheduleDTO);
    }
}
