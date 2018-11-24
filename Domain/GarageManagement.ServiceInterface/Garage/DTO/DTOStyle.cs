namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOStyle : DTOBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }
    }
}
