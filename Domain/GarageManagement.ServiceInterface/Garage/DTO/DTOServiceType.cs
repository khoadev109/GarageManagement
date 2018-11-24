namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOServiceType : DTOBase
    {
        public int Id { get; set; }
        public string  Name { get; set; }

        public int ParentId { get; set; }
        public string ParentName { get; set; }
    }
}
