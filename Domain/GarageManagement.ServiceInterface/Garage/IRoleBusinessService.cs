using GarageManagement.ServiceInterface.Garage.DTO;
using Common.Core.WebAPI.Result;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IRoleBusinessService
    {
        Task<DataResult<List<DTORole>>> Get(int role);
    }
}
