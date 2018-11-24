using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTORoleRightModule : DTOBase
    {
        public int Id { get; set; } = 0;
        public int Value { get; set; }

        public int? RoleId { get; set; }
        public int? UserId { get; set; }
        public int ModuleId { get; set; } = 0;

        public string ModuleName { get; set; }
        public string RoleName { get; set; }

        public List<DTOUserRight> UserRights { get; set; }
    }
}
