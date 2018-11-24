using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOService : DTOPaging<DTOService>
    {
        public DTOService()
        {
            Branches = new List<DTOBranch>();
            Units = new List<DTOServiceUnit>();
            ServiceTypes = new List<DTOServiceType>();
        }

        public string Id { get; set; } = string.Empty;
        public int GenerateId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public double Cost { get; set; } = 0;
        public string Description { get; set; } = string.Empty;

        public int ServiceTypeId { get; set; } = 0;
        public string ServiceTypeName { get; set; } = string.Empty;

        public int UnitId { get; set; } = 0;
        public string UnitName { get; set; } = string.Empty;

        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;

        public List<DTOBranch> Branches { get; set; }
        public List<DTOServiceUnit> Units { get; set; }
        public List<DTOServiceType> ServiceTypes { get; set; }        
    }
}
