namespace GarageManagement.Garage.Entity.Entities
{
    public class Year : BaseEntity
    {
        public string Name { get; set; }
        public int ModelId { get; set; }

        public virtual Model Model { get; set; }
    }
}
