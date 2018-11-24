using System;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;

namespace GarageManagement.Garage.WebAPI.ModelBinder
{
    public class CustomerModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType != typeof(CustomerParameter))
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

            var parameter = CustomerParameter.Parse(key);
            if (parameter != null)
            {
                bindingContext.Model = parameter;
                return true;
            }

            bindingContext.ModelState.AddModelError(
            bindingContext.ModelName, "Cannot convert value to Customer Parameters");
            return false;
        }
    }
}
