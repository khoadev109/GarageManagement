using System;
using System.Collections.Generic;

namespace GarageManagement.Garage.Entity.Entities
{
    public class CustomerExchange : BaseEntity
    {
        public CustomerExchange()
        {
            Quotations = new HashSet<Quotation>();
        }

        public int MaintenanceCount { get; set; }
        public DateTime StartDate { get; set; }
        public Nullable<bool> Transferred { get; set; }
        public string TransfereeId { get; set; }
        public string Transferee { get; set; }
        public DateTime? TransferDate { get; set; }
        public string CarId { get; set; }
        public string CustomerId { get; set; }

        public virtual Car Car { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ICollection<Quotation> Quotations { get; set; }
    }
}
