namespace GarageManagement.Garage.Entity.Entities
{
    public class InventoryStatus : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
