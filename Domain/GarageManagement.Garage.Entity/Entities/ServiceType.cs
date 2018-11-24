using System;
using System.Collections.Generic;

namespace GarageManagement.Garage.Entity.Entities
{
    public class ServiceType : BaseEntity
    {
        public ServiceType()
        {
            Children = new HashSet<ServiceType>();
        }

        public string Name { get; set; }
        public Nullable<int> ParentId { get; set; }

        public virtual ServiceType Parent { get; set; }
        public virtual ICollection<ServiceType> Children { get; set; }
    }
}
