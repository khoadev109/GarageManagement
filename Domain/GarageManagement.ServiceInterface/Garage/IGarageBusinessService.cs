using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IGarageBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOGarage>> GetGarageSettingInformationAsync();

        Task<DataResult<bool>> CreateOrUpdateGarageAsync(DTOGarage garageDTO);
    }
}
