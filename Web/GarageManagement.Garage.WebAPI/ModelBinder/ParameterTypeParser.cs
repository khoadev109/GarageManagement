namespace GarageManagement.Garage.WebAPI.ModelBinder
{
    public static class ParameterTypeParser
    {
        public static string ToStringValueOrEmpty(this string value)
        {
            return !string.IsNullOrEmpty(value) && value != "empty" ? value : string.Empty;
        }

        public static T ToValueOrDefault<T>(this T value) where T : class
        {
            return value != null ? value : default(T);
        }
    }
}