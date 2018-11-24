using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Branch : BaseEntity<string>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
    }
}
