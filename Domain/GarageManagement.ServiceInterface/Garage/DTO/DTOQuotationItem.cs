using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOQuotationAndItems : DTOBase
    {
        public DTOQuotationAndItems()
        {
            Items = new List<DTOQuotationItem>();
        }

        public string QuotationId { get; set; } = string.Empty;
        public List<DTOQuotationItem> Items { get; set; }
    }

    public class DTOQuotationItem : DTOBase
    {
        public DTOQuotationItem()
        {
            Accessaries = new List<DTOAccessary>();
            AccessaryUnits = new List<DTOAccessaryUnit>();
            Employees = new List<DTOEmployee>();
            Services = new List<DTOService>();
            ServiceUnits = new List<DTOServiceUnit>();
        }

        public int Id { get; set; } = 0;
        public Nullable<int> Quantity { get; set; } = 0;
        public Nullable<double> Duration { get; set; } = 0;
        public double UnitPrice { get; set; }
        public double TotalPrice { get; set; } = 0;
        public string TotalPriceText { get; set; } = string.Empty;
        public Nullable<int> Discount { get; set; } = 0;
        public double FinalPrice { get; set; } = 0;
        public int VAT { get; set; } = 0;

        public int UnitId { get; set; }
        public string UnitName { get; set; }
        public string QuotationId { get; set; } = string.Empty;
        public string AccessaryId { get; set; } = string.Empty;
        public string AccessaryName { get; set; } = string.Empty;
        public string ServiceId { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;

        public List<DTOAccessary> Accessaries { get; set; }
        public List<DTOAccessaryUnit> AccessaryUnits { get; set; }
        public List<DTOService> Services { get; set; }
        public List<DTOServiceUnit> ServiceUnits { get; set; }
        public List<DTOEmployee> Employees { get; set; }
    }

    public class DTOParentCategoryWithItems
    {
        public DTOParentCategoryWithItems()
        {
            ParentCategory = new DTOCategory();
            Items = new List<DTOQuotationItem>();
        }

        public DTOCategory ParentCategory { get; set; }
        public List<DTOQuotationItem> Items { get; set; }
    }

    public class DTOParentServiceTypeWithItems
    {
        public DTOParentServiceTypeWithItems()
        {
            ParentServiceType = new DTOServiceType();
            Items = new List<DTOQuotationItem>();
        }

        public DTOServiceType ParentServiceType { get; set; }
        public List<DTOQuotationItem> Items { get; set; }
    }
}
