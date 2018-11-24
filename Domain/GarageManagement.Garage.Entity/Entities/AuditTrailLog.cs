using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class AuditTrailLog : BaseEntity
    {
        public string Module { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string Action { get; set; }
        public string OriginalValues { get; set; }
        public string NewValues { get; set; }
    }
}
