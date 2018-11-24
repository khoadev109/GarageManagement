using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTORole : DTOBase
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
    }
}
