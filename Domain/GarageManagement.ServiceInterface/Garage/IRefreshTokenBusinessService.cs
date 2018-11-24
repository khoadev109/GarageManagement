using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IRefreshTokenBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTORefreshToken>> FindRefreshTokenAsync(string refreshToken);
        Task<DataResult<bool>> AddRefreshTokenAsync(DTORefreshToken refreshTokenDTO);
        Task<DataResult<bool>> RemoveRefreshTokenAsync(DTORefreshToken refreshTokenDTO);
    }
}
