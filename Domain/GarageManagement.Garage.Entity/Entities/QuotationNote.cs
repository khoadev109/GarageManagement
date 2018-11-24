namespace GarageManagement.Garage.Entity.Entities
{
    public class QuotationNote : BaseEntity
    {
        public string Note { get; set; }
        public string QuotationId { get; set; }
        public int StatusId { get; set; }

        public virtual Quotation Quotation { get; set; }
        public virtual QuotationStatus Status { get; set; }
    }
}
