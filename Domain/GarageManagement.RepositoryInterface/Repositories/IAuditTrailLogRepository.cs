using GarageManagement.Garage.Entity.Enum;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.RepositoryInterface.Repositories
{
    public interface IAuditTrailLogRepository : IRepository<AuditTrailLog>
    {
        void InsertLogForCreateAction<T>(ModuleEnum module, string userName, T newChange) where T : class;

        void InsertLogForUpdateAction<T>(ModuleEnum module, string userName, T newChange, T original) where T : class;

        void InsertLogForDeleteAction<T>(ModuleEnum module, string userName, T original) where T : class;
    }
}
