
namespace GarageManagement.Garage.Entity.Entities
{
    public class QuotationEmployee : BaseEntity
    {
        public string QuotationId { get; set; }
        public string EmployeeId { get; set; }

        public virtual Quotation Quotation { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
