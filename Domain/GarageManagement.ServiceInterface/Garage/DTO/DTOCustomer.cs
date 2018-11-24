using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOCustomer : DTOPaging<DTOCustomer>
    {
        public DTOCustomer()
        {
            Branches = new List<DTOBranch>();
            CustomerTypes = new List<DTOCustomerType>();
        }

        public string Id { get; set; } = string.Empty;
        public int GenerateId { get; set; } = 0;
        public int CustomerExchangeId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Fax { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Website { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Ward { get; set; } = string.Empty;
        public string TaxCode { get; set; } = string.Empty;
        public string BankAccount { get; set; } = string.Empty;
        public string BankName { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
        public string ContactPosition { get; set; } = string.Empty;
        public bool? IsSupplier { get; set; } = false;
        public bool? IsOwner { get; set; } = false;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;

        public int CustomerTypeId { get; set; } = 0;
        public string CustomerTypeName { get; set; } = string.Empty;

        public List<DTOBranch> Branches { get; set; }
        public List<DTOCustomerType> CustomerTypes { get; set; }
    }

    public class DTOCustomerCars
    {
        public DTOCustomerCars()
        {
            Customer = new DTOCustomer();
            Cars = new List<DTOCar>();
        }

        public DTOCustomer Customer { get; set; }
        public List<DTOCar> Cars { get; set; }
    }
}
