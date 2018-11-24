using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public enum DTOQuotationStatusName
    {
        None = 0,
        RequestFromCustomer = 1,
        Quotation = 2,
        Cancel = 3,
        RepairCommand = 4,
        ExportMaterial = 5,
        Complete = 6,
        CheckUp = 7,
        Done = 8
    }

    public class DTOQuotationStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class DTOQuotation : DTOPaging<DTOQuotation>
    {
        public DTOQuotation()
        {
            Car = new DTOCar();
            Customer = new DTOCustomer();
            Status = new DTOQuotationStatus();
            Branches = new List<DTOBranch>();
            CustomerTypes = new List<DTOCustomerType>();
        }

        public string Id { get; set; } = string.Empty;
        public int CustomerExchangeId { get; set; } = 0;
        public string EntryDate { get; set; } = DateTime.Now.ToString("dd/MM/yyyy");
        public string StartDate { get; set; } = DateTime.Now.ToString("dd/MM/yyyy");
        public string ExpectedCompleteDate { get; set; } = "";
        public string CompleteDate { get; set; } = "";
        public string ContactName { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public Nullable<bool> Tracking { get; set; } = false;
        public int NextKm { get; set; } = 0;
        public string NextMaintenanceDate { get; set; } = "";

        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;

        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;

        public int StatusId { get; set; } = 0;
        public string StatusName { get; set; } = string.Empty;

        public string AdviserId { get; set; } = string.Empty;
        public string AdviserName { get; set; } = string.Empty;

        public DTOCar Car { get; set; }
        public DTOCustomer Customer { get; set; }
        public DTOQuotationStatus Status { get; set; }

        public List<DTOBranch> Branches { get; set; }
        public List<DTOCustomerType> CustomerTypes { get; set; }
    }

    public class DTOCombineQuotation
    {
        public DTOCombineQuotation()
        {
            Quotation = new DTOQuotation();
            CustomerExchange = new DTOCustomerExchange();
            Items = new List<DTOQuotationItem>();
            Employees = new List<DTOEmployee>();
        }

        public int CustomerExchangeId { get; set; } = 0;
        public string CarId { get; set; } = string.Empty;
        public string CustomerId { get; set; } = string.Empty;
        public DTOQuotation Quotation { get; set; }
        public DTOCustomerExchange CustomerExchange { get; set; }
        public List<DTOQuotationItem> Items { get; set; }
        public List<DTOEmployee> Employees { get; set; }
    }
}
