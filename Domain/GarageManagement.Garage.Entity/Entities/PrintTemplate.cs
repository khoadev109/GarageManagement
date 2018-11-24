using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.Garage.Entity.Entities
{
    public class PrintTemplate : BaseEntity
    {
        public string Content { get; set; }
        public int StatusId { get; set; }
    }
}
