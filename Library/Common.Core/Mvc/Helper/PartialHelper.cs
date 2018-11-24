using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Linq.Expressions;

namespace Common.Core.Mvc.Helper
{
    public static class PartialHelper
    {
        /// <summary>
        /// Return Partial View.
        /// The element naming convention is maintained in the partial view by setting the prefix name from the expression.
        /// The name of the view (by default) is the class name of the Property or a UIHint("partial name").
        /// @Html.PartialFor(m => m.Address)  - partial view name is the class name of the Address property.
        /// </summary>
        /// <param name="expression">Model expression for the prefix name (m => m.Address)</param>
        /// <returns>Partial View as Mvc string</returns>
        public static MvcHtmlString PartialFor<TModel, TProperty>(this HtmlHelper<TModel> html, Expression<Func<TModel, TProperty>> expression)
        {
            return html.PartialFor(expression);
        }

        /// <summary>
        /// Return Partial View.
        /// The element naming convention is maintained in the partial view by setting the prefix name from the expression.
        /// </summary>
        /// <param name="partialName">Partial View Name</param>
        /// <param name="expression">Model expression for the prefix name (m => m.Group[2])</param>
        /// <returns>Partial View as Mvc string</returns>
        public static MvcHtmlString PartialFor<TModel, TProperty>(this HtmlHelper<TModel> html, Expression<Func<TModel, TProperty>> expression, string partialName = "")
        {
            string name = ExpressionHelper.GetExpressionText(expression);
            string modelName = html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
            ModelMetadata metaData = ModelMetadata.FromLambdaExpression(expression, html.ViewData);
            object model = metaData.Model;

            //if (partialName != "")
            //    partialName = (metaData.TemplateHint == null ? typeof(TProperty).Name : metaData.TemplateHint).Replace("`1", "");

            // Use a ViewData copy with a new TemplateInfo with the prefix set
            ViewDataDictionary viewData = new ViewDataDictionary(html.ViewData)
            {
                TemplateInfo = new TemplateInfo { HtmlFieldPrefix = modelName }
            };

            // Call standard MVC Partial
            return html.Partial(partialName, model, viewData);
        }
    }
}
