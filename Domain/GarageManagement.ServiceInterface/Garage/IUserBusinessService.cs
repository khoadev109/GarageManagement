using System.Threading.Tasks;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IUserBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOUser>>> Get();
        Task<DataResult<DTOUser>> GetUserByIdAsync(int userId);
        Task<DataResult<DTOUser>> CheckValidAuthenticationAndGetUserIsValidAsync(string userName, string password);
    }
}
