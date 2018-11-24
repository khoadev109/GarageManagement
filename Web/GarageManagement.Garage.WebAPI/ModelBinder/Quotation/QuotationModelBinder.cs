using System;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;

namespace GarageManagement.Garage.WebAPI.ModelBinder
{
    public class QuotationModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType != typeof(QuotationParameter))
                return false;

            ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (value == null)
                return false;

            string key = value.RawValue as string;
            if (key == null)
            {
                bindingContext.ModelState.AddModelError(bindingContext.ModelName, "Wrong value type");
                return false;
            }

            var parameter = QuotationParameter.Parse(key);
            if (parameter != null)
            {
                bindingContext.Model = parameter;
                return true;
            }

            bindingContext.ModelState.AddModelError(
            bindingContext.ModelName, "Cannot convert value to Quotation Parameters");
            return false;
        }
    }
}
