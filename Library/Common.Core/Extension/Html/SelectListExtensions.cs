using System;
using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Common.Core.Extension.Html
{
    public static class SelectListExtensions
    {
        public static List<SelectListItem> ToSelectList<T>(this IEnumerable<T> enumerable, Func<T, string> text, Func<T, string> value, string defaultOption)
        {
            var items = enumerable.Select(f => new SelectListItem() { Text = text(f), Value = value(f) }).ToList();
            if(defaultOption != "") 
                items.Insert(0, new SelectListItem() { Text = defaultOption, Value = "0" });
            return items;
        }
    }
}
