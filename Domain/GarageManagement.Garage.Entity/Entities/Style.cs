namespace GarageManagement.Garage.Entity.Entities
{
    public class Style : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ManufacturerId { get; set; }

        public virtual Manufacturer Manufacturer { get; set; }
    }
}
