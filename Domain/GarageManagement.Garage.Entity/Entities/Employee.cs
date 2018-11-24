using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Employee : BaseEntity<string>
    {
        public Employee()
        {
            Users = new HashSet<User>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public Nullable<DateTime> Birthday { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string IdentityCard { get; set; }
        public Nullable<bool> Delete { get; set; }
        public Nullable<bool> Enable { get; set; }
        public string BranchId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
