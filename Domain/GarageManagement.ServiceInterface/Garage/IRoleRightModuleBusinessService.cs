using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Garage.DTO;
using Common.Core.WebAPI.Result;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IRoleRightModuleBusinessService
    {
        Task<DataResult<List<DTORoleRightModule>>> GetByRole(int role_id);
        Task<DataResult<List<DTORoleRightModule>>> GetByUser(int user_id);
        Task<DataResult<bool>> Create(RoleRightModule roleRightModule);
    }
}
