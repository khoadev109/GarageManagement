using System;
using Common.Core.Data;
using System.Data.Entity;
using System.Web.Script.Serialization;
using GarageManagement.Garage.Entity.Enum;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface.Repositories;

namespace GarageManagement.Infrastructure.Persistance
{
    public class AuditTrailLogRepository : Repository<AuditTrailLog>, IAuditTrailLogRepository
    {
        public AuditTrailLogRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public void InsertLogForCreateAction<T>(ModuleEnum module, string userName, T newChange) where T : class
        {
            InsertLog<T>(module, AuditTrailLogAction.CREATE.ToString(), userName, newChange);
        }

        public void InsertLogForUpdateAction<T>(ModuleEnum module, string userName, T newChange, T original) where T : class
        {
            InsertLog<T>(module, AuditTrailLogAction.UPDATE.ToString(), userName, newChange, original);
        }

        public void InsertLogForDeleteAction<T>(ModuleEnum module, string userName, T original) where T : class
        {
            InsertLog<T>(module, AuditTrailLogAction.DELETE.ToString(), userName, original);
        }

        private void InsertLog<T>(ModuleEnum module, string action, string userName, T newChange = null, T original = null) where T : class
        {
            var log = new AuditTrailLog
            {
                Module = module.ToString(),
                CreatedDate = DateTime.Now,
                CreatedBy = userName,
                Action = action
            };

            if (original != null)
                log.OriginalValues = ConvertToJsonValue(original);

            if (newChange != null)
                log.NewValues = ConvertToJsonValue(newChange);

            dbSet.Add(log);
            dbContext.SaveChanges();
        }

        private string ConvertToJsonValue<T>(T source) where T : class
        {
            var serializer = new JavaScriptSerializer();
            var serialized = serializer.Serialize(source);
            return serialized;
        }
    }
}
