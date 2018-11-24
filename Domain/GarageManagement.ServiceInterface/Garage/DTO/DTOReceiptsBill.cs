using System;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOReceiptsBill : DTOBase
    {
        public int Id { get; set; }
        public string Payer { get; set; }
        public string Content { get; set; }
        public string Attach { get; set; }
        public double Money { get; set; }
        public string MoneyText { get; set; }
        public string CreateDate { get; set; }
        public string ModifiedDate { get; set; }
        public string QuotationId { get; set; }
    }
}
