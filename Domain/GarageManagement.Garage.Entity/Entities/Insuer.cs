namespace GarageManagement.Garage.Entity.Entities
{
    public class Insuer : BaseEntity<string>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public double? Taxcode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Website { get; set; }
        public string Note { get; set; }
    }
}
