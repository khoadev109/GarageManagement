using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class QuotationItem : BaseEntity
    {
        public Nullable<int> Quantity { get; set; }
        public Nullable<double> Duration { get; set; }
        public double TotalPrice { get; set; }
        public string TotalPriceText { get; set; }
        public Nullable<int> Discount { get; set; }
        public double FinalPrice { get; set; }
        public int VAT { get; set; }

        public Nullable<int> UnitId { get; set; }
        public string QuotationId { get; set; }
        public string AccessaryId { get; set; }
        public string ServiceId { get; set; }
        public string EmployeeId { get; set; }

        public virtual AccessaryUnit AccessaryUnit { get; set; }
        public virtual ServiceUnit ServiceUnit { get; set; }
        public virtual Quotation Quotation { get; set; }
        public virtual Accessary Accessary { get; set; }
        public virtual Service Service { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
