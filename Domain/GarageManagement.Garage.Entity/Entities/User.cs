using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class User : BaseEntity
    {
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreateDate { get; set; }
        public Nullable<DateTime> ModifyDate { get; set; }
        public Nullable<DateTime> LoginDate { get; set; }

        public int RoleId { get; set; }
        public string BranchId { get; set; }
        public string EmployeeId { get; set; }

        public virtual Role Role { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
