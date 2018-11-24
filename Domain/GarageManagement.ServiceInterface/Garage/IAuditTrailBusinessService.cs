using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Enum;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IAuditTrailBusinessService : IServiceBase<GarageDbContext>
    { }
}
