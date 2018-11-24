using System;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public enum MaintenanceScheduleStatus
    {
        Queued,
        Processing,
        Error,
        Informed
    }

    public class DTOMaintenanceSchedule : DTOBase
    {
        public string QuotationId { get; set; }
        public long Km { get; set; }
        public DateTime Startdate { get; set; }
        public string Status { get; set; }
    }

    public class DTOTemplateSchedule : DTOMaintenanceSchedule
    {
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerPhone { get; set; }
    }
}
