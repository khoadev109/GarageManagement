using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IStyleBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<List<DTOStyle>>> GetAllAsync();
        Task<DataResult<List<DTOStyle>>> GetStylesByManufacturerAsync(int manufacturerId);
    }
}
