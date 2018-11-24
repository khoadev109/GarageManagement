namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOQuotationNote
    {
        public int Id { get; set; }
        public string Note { get; set; }
        public string QuotationId { get; set; }
        public int StatusId { get; set; }
    }
}
