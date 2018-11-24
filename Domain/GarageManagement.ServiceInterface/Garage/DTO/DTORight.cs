namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTORight : DTOBase
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public bool Value { get; set; } = false;
    }
}
