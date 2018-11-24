using System;
using System.Configuration;

namespace Common.Core.Extension.Configuration
{
    public class ConfigCollectionExtension : ConfigurationSection
    {
        private const string CONFIG_SET = "CollectionSet";
        private const string CONFIG_ITEM = "CollectionItem";
        private const string CONFIG_SECTION = "CollectionSection";
        
        [ConfigurationProperty(CONFIG_SET)]
        [ConfigurationCollection(typeof(ConfigItemCollection), AddItemName = CONFIG_ITEM)]
        public ConfigItemCollection ConfigSet { get { return base[CONFIG_SET] as ConfigItemCollection; } }

        public static ConfigCollectionExtension GetSection()
        {
            try
            {
                var section = ConfigurationManager.GetSection(CONFIG_SECTION) as ConfigCollectionExtension;
                return section;
            }
            catch (Exception ex)
            {
                //TO DO: Implement logging code here.
                return null;
            }
        }
    }

    public class ConfigItemCollection : ConfigurationElementCollection
    {
        protected override ConfigurationElement CreateNewElement() { return new ConfigItem(); }

        protected override object GetElementKey(ConfigurationElement element)
        {
            var e = element as ConfigItem;
            return e != null ? e.Text : string.Empty;
        }
    }

    public class ConfigItem : ConfigurationElement
    {
        [ConfigurationProperty("icon", IsKey = false, IsRequired = false)]
        public string Icon
        {
            get { return (string)this["icon"]; }
            set { this["icon"] = value; }
        }

        [ConfigurationProperty("text", IsKey = true, IsRequired = true)]
        public string Text
        {
            get { return (string)this["text"]; }
            set { this["text"] = value; }
        }

        [ConfigurationProperty("value", IsKey = true, IsRequired = true)]
        public string Value
        {
            get { return (string)this["value"]; }
            set { this["value"] = value; }
        }

        [ConfigurationProperty("name", IsKey = true, IsRequired = true)]
        public string Name
        {
            get { return (string)this["name"]; }
            set { this["name"] = value; }
        }

        [ConfigurationProperty("controller", IsKey = true, IsRequired = true)]
        public string Controller
        {
            get { return (string)this["controller"]; }
            set { this["controller"] = value; }
        }
    }
}
