using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOAccessary : DTOPaging<DTOService>
    {
        public string Id { get; set; } = string.Empty;
        public int GenerateId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string BarCode { get; set; } = string.Empty;
        public double Price { get; set; } = 0;
        public double CostGoodSold { get; set; } = 0;
        public Nullable<bool> OutOfStock { get; set; } = false;
        public string Description { get; set; } = string.Empty;

        public int CategoryId { get; set; } = 0;
        public string CategoryName { get; set; } = string.Empty;
        public int UnitId { get; set; } = 0;
        public string UnitName { get; set; } = string.Empty;
        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;

        public List<DTOCategory> Categories { get; set; }
        public List<DTOAccessaryUnit> Units { get; set; }
        public List<DTOBranch> Branches { get; set; }
    }
}
