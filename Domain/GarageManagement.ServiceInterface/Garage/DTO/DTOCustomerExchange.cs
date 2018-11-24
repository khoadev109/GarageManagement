using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOCustomerExchange : DTOBase
    {
        public DTOCustomerExchange()
        {
            Car = new DTOCar();
            Customer = new DTOCustomer();
            Quotations = new List<DTOQuotation>();
        }

        public int Id { get; set; }
        public int MaintenanceCount { get; set; } = 0;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public Nullable<bool> Transferred { get; set; } = false;
        public string TransfereeId { get; set; } = "";
        public string Transferee { get; set; } = string.Empty;
        public DateTime? TransferDate { get; set; } = DateTime.Now;

        public DTOCar Car { get; set; }
        public DTOCustomer Customer { get; set; }
        public List<DTOQuotation> Quotations { get; set; }
    }
}
