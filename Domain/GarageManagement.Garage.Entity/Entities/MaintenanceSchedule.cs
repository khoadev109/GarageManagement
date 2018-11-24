using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class MaintenanceSchedule : BaseEntity
    {
        public string QuotationId { get; set; }
        public long Km { get; set; }
        public DateTime Startdate { get; set; }
        public string Status { get; set; }
        public int RetryCount { get; set; }

        public virtual Quotation Quotation { get; set; }
    }
}
