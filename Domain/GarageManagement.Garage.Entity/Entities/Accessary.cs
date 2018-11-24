using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Accessary : BaseEntity<string>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string BarCode { get; set; }
        public double Price { get; set; }
        public double CostGoodSold { get; set; }
        public Nullable<bool> OutOfStock { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int UnitId { get; set; }
        public string BranchId { get; set; }

        public virtual Category Category { get; set; }
        public virtual AccessaryUnit Unit { get; set; }
        public virtual Branch Branch { get; set; }
    }
}
