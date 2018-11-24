using System;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOAuditTrailLog : DTOBase
    {
        public string Module { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string Action { get; set; }
        public string OriginalValues { get; set; }
        public string NewValues { get; set; }
    }
}
