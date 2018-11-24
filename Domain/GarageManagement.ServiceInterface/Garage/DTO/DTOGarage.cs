using System;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOGarage
    {
        public int Id { get; set; } = 0;
        public int GarageId { get { return Id; } }
        public string Website { get; set; } = string.Empty;
        public string ExpireDate { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Ward { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public Nullable<bool> SmsPhoneNumber { get; set; } = false;
        public Nullable<bool> EmailSchedule { get; set; } = false;
    }

    public class DTOGarageLayout
    {
        public int GarageId { get; set; } = 0;
        public string Title { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Font { get; set; } = string.Empty;
        public string Theme { get; set; } = string.Empty;
        public string LicenseFormat { get; set; } = string.Empty;
        public bool Status { get; set; } = false;
    }
}
