using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.ServiceInterface.Result;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IModuleBusinessService
    {
        Task<DataResult<List<DTOModule>>> Get();
    }
}
