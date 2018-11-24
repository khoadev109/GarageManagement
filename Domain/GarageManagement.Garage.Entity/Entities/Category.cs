using System;
using System.Collections.Generic;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Category : BaseEntity
    {
        public Category()
        {
            Children = new HashSet<Category>();
        }

        public string Name { get; set; }
        public Nullable<int> ParentId { get; set; }

        public virtual Category Parent { get; set; }
        public virtual ICollection<Category> Children { get; set; }
    }
}
