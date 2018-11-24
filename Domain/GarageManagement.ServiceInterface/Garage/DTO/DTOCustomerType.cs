namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOCustomerType : DTOBase
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
