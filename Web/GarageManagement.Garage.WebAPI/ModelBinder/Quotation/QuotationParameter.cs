using System.Web.Http.ModelBinding;

namespace GarageManagement.Garage.WebAPI.ModelBinder
{
    [ModelBinder(typeof(QuotationModelBinder))]
    public class QuotationParameter
    {
        public string QuotationId { get; set; }
        public string QuotationStatusId { get; set; }
        public string CustomerId { get; set; }
        public string QuotationEntryDate { get; set; }
        public string LookupType { get; set; }

        public static QuotationParameter Parse(string entryParameters)
        {
            var parameterParts = entryParameters.Split(',');
            int countOfCurrentParameters = typeof(QuotationParameter).GetProperties().Length;

            if (parameterParts.Length == 0 || parameterParts.Length < countOfCurrentParameters)
                return null;

            QuotationParameter result = new QuotationParameter
            {
                QuotationId = parameterParts[0].ToStringValueOrEmpty(),
                QuotationStatusId = parameterParts[1].ToStringValueOrEmpty(),
                CustomerId = parameterParts[2].ToStringValueOrEmpty(),
                QuotationEntryDate = parameterParts[3].ToStringValueOrEmpty(),
                LookupType = parameterParts[4].ToStringValueOrEmpty()
            };
            
            return result;
        }
    }
}
