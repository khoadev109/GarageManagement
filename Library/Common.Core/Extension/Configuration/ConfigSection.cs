using System;
using System.Web.Mvc;
using System.Configuration;
using System.Collections.Generic;

namespace Common.Core.Extension.Configuration
{
    public class JsonConfig
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }

    public enum DropDownListSearchType { Text, Value }

    public class ConfigSection
    {
        public static string GetTextValueDropDownList(string searchTerm, string dropDownListName, string controllerContainer, DropDownListSearchType searchType)
        {
            var dropDownList = GetDropDownList(dropDownListName, controllerContainer);
            if (dropDownList.Count > 0)
                return searchType == DropDownListSearchType.Text
                                    ? dropDownList.Find(d => d.Value == searchTerm)?.Text
                                    : dropDownList.Find(d => d.Text == searchTerm)?.Value;
            return string.Empty;
        }

        public static List<SelectListItem> GetDropDownList(string dropDownListName, string controllerContainer, string defaultOption = "")
        {
            var selectList = new List<SelectListItem>();
            var config = ConfigurationManager.GetSection("CollectionSection") as ConfigCollectionExtension;

            if (defaultOption != "")
                selectList.Add(new SelectListItem { Text = defaultOption, Value = "0" });

            foreach (ConfigItem element in config.ConfigSet)
            {
                if (element.Name == dropDownListName && Array.Exists<string>(element.Controller.Split(','), x => x.Contains(controllerContainer)))
                    selectList.Add(new SelectListItem { Text = element.Text, Value = element.Value });
            }
            return selectList;
        }

        public static List<JsonConfig> GetJsonListFromDropDownList(List<SelectListItem> dropDownList)
        {
            var jsonConfig = new List<JsonConfig>();

            foreach (var element in dropDownList)
                jsonConfig.Add(new JsonConfig { Value = element.Value, Text = element.Text });

            return jsonConfig;
        }
    }
}
