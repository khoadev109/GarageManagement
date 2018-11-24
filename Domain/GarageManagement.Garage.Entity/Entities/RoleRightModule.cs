using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class RoleRightModule : BaseEntity
    {
        public int Value { get; set; }

        public int? RoleId { get; set; }
        public int? UserId { get; set; }
        public int ModuleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
        public virtual Module Module { get; set; }
    }
}
