using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Customer : BaseEntity<string>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string TaxCode { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactPosition { get; set; }
        public Nullable<bool> IsSupplier { get; set; }
        public Nullable<DateTime> CreatedDate { get; set; }
        public Nullable<DateTime> ModifiedDate { get; set; }

        public string BranchId { get; set; }
        public int CustomerTypeId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual CustomerType CustomerType { get; set; }
    }
}
