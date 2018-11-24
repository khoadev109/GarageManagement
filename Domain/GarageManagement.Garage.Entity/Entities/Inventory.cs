using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Inventory : BaseEntity<int>
    {
        public int InputQuantity { get; set; }
        public DateTime InputDate { get; set; }
        public int OutputQuantity { get; set; }
        public DateTime OutputDate { get; set; }
        public int Deduction { get; set; }
        public int? NeededQuantity { get; set; }

        public string BranchId { get; set; }
        public string AccessaryId { get; set; }
        public int StatusId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual Accessary Accessary { get; set; }
        public virtual InventoryStatus InventoryStatus { get; set; }
    }
}
