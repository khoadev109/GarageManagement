
using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class PaySlipBill : BaseEntity
    {
        public string Receiver { get; set; }
        public string Content { get; set; }
        public string Attach { get; set; }
        public double Money { get; set; }
        public string MoneyText { get; set; }
        public DateTime ModifiedDate { get; set; }
        public Nullable<DateTime> CreateDate { get; set; }

        public string QuotationId { get; set; }

        public virtual Quotation Quotation { get; set; }
    }
}
