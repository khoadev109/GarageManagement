using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOPrintTemplate : DTOBase
    {
        public int Id { get; set; } = 0;
        public string Content { get; set; } = string.Empty;
        public int StatusId { get; set; } = 0;
    }
}
