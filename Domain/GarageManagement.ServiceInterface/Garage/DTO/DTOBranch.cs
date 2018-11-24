namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOBranch : DTOBase
    {
        public string Id { get; set; } = string.Empty;
        public int GenerateId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Ward { get; set; } = string.Empty;
    }
}
