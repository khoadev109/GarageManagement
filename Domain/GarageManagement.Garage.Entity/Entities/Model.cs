namespace GarageManagement.Garage.Entity.Entities
{
    public class Model : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int StyleId { get; set; }
        public int ManufacturerId { get; set; }

        public virtual Style Style { get; set; }
        public virtual Manufacturer Manufacturer { get; set; }
    }
}
