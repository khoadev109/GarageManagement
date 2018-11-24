using Common.Core.Extension;
using System.ComponentModel.DataAnnotations;

namespace Common.Core.Mvc.Attribute
{
    public class VietnamPhoneAttribute : ValidationAttribute/*, IClientValidatable*/
    {
        private const string _requiredPhoneNumber = "Chưa nhập số điện thoại";
        private const string _invalidPhoneNumber = "Số điện thoại không hợp lệ";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            try
            {
                if (value == null)
                    return new ValidationResult(_requiredPhoneNumber);

                var intPhoneValue = int.Parse(value.ToString());
                var phoneLength = IntegerExtensions.GetLength(intPhoneValue);

                if (phoneLength < 9 || phoneLength > 10)
                    return new ValidationResult(_invalidPhoneNumber);

                return ValidationResult.Success;
            }
            catch
            {
                return new ValidationResult(_invalidPhoneNumber);
            }
        }

        //new method
        //public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        //{
        //    var rule = new ModelClientValidationRule();
        //    rule.ErrorMessage = FormatErrorMessage(metadata.GetDisplayName());
        //    rule.ValidationParameters.Add("chars", _chars);
        //    rule.ValidationType = "exclude";
        //    yield return rule;
        //}
    }
}
