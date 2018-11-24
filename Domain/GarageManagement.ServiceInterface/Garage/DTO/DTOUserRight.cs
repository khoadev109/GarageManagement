using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOUserRight : DTOBase
    {
        public int Id { get; set; }

        public int ModuleId { get; set; }

        public string ModuleName { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public int Value { get; set; }
    }
}
