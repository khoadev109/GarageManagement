using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOModule : DTOBase
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int RightValue { get; set; }

        public List<DTORight> RightModules { get; set; }
    }
}
