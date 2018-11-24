using System;
using System.Reflection;
using static Microsoft.Security.Application.Sanitizer;

namespace Common.Core.Mvc.Security
{
    public static class PersistentXSS
    {
        /// <summary>
        /// Prevent Persistent XSS for each property in model corresponding with form 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        public static void ValidateAllInputsInModel<T>(T model) where T : class, new()
        {
            var type = model.GetType();
            var propertiesInfo = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            Array.ForEach(propertiesInfo, property =>
            {
                var propertyValue = property.GetValue(model, null);
                if (propertyValue is string)
                    property.SetValue(model, propertyValue.ToString().ValidateEachInput());
            });
        }
    }

    public static class PersistentXSSExtension
    {
        /// <summary>
        /// Prevent Persistent XSS for each input field in form
        /// </summary>
        /// <param name="fieldContent"></param>
        /// <returns></returns>
        public static string ValidateEachInput(this string fieldContent)
        {
            var validatedInput = GetSafeHtmlFragment(fieldContent);
            return validatedInput;
        }
    }
}
