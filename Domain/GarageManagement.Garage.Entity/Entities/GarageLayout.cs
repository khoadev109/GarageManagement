namespace GarageManagement.Garage.Entity.Entities
{
    public class GarageLayout : BaseEntity
    {
        public string Title { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Font { get; set; }
        public string Theme { get; set; }
        public string LicenseFormat { get; set; }
        public bool Status { get; set; }
        public int GarageId { get; set; }

        public virtual GarageInfo Garage { get; set; }
    }
}
