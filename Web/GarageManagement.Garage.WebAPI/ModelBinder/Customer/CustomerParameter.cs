using System.Web.Http.ModelBinding;

namespace GarageManagement.Garage.WebAPI.ModelBinder
{
    [ModelBinder(typeof(CustomerModelBinder))]
    public class CustomerParameter
    {
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CarLicensePlates { get; set; }

        public static CustomerParameter Parse(string entryParameters)
        {
            var parts = entryParameters.Split(',');
            int countOfCurrentParameters = typeof(CustomerParameter).GetProperties().Length;

            if (parts.Length == 0 || parts.Length < countOfCurrentParameters)
                return null;

            string customerId = parts[0].ToStringValueOrEmpty();
            string customerName = parts[1].ToStringValueOrEmpty();
            string phone = parts[2].ToStringValueOrEmpty();
            string carLicensePlates = parts[3].ToStringValueOrEmpty();

            CustomerParameter result = new CustomerParameter
            {
                CustomerId = customerId,
                CustomerName = customerName,
                CustomerPhone = phone,
                CarLicensePlates = carLicensePlates
            };

            return result;
        }
    }
}
