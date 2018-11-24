
namespace GarageManagement.Garage.WebAPI.Attributes
{
    public class UnauthorizedResult
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Redirect { get; set; }
    }
}
