using System.Collections.Generic;

namespace GarageManagement.Garage.Entity.Entities
{
    public class RightModule : BaseEntity
    {
        public int RightId { get; set; }
        public int ModuleId { get; set; }

        public virtual Right Right { get; set; }
        public virtual Module Module { get; set; }
    }
}
