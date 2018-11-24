using System.Linq;
using System.Collections.Generic;
using System;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOCar : DTOPaging<DTOCar>
    {
        public DTOCar()
        {
            Branches = new List<DTOBranch>();
            Manufacturers = new List<DTOManufacturer>();
            Styles = new List<DTOStyle>();
            Models = new List<DTOModel>();
            Years = new List<DTOYear>();
        }

        public string Id { get; set; } = string.Empty;
        public int GenerateId { get; set; } = 0;
        public string Color { get; set; } = string.Empty;
        public string VinNumber { get; set; } = string.Empty;
        public string MachineNumber { get; set; } = string.Empty;
        public string LicensePlates { get; set; } = string.Empty;
        public long? Km { get; set; } = 0;

        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;
        public int ManufacturerId { get; set; } = 0;
        public string ManufacturerName { get; set; } = string.Empty;
        public int StyleId { get; set; } = 0;
        public string StyleName { get; set; } = string.Empty;
        public int ModelId { get; set; } = 0;
        public string ModelName { get; set; } = string.Empty;
        public int YearId { get; set; } = 0;
        public string YearName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CurrentCarOwnerId { get; set; }
        public string CurrentCarOwnerName { get; set; }

        public DTOCustomer CurrentCarOwner { get; set; }
        public List<DTOYear> Years { get; set; }
        public List<DTOStyle> Styles { get; set; }
        public List<DTOModel> Models { get; set; }
        public List<DTOBranch> Branches { get; set; }
        public List<DTOManufacturer> Manufacturers { get; set; }
    }

    public class DTOCarWithOwner
    {
        public DTOCarWithOwner()
        {
            Car = new DTOCar();
        }

        public int CustomerExchangeId { get; set; } = 0;
        public DTOCar Car { get; set; }
    }
}
