using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class GarageInfo : BaseEntity
    {
        public string Website { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Phone { get; set; }
        public string Logo { get; set; }
    }
}
