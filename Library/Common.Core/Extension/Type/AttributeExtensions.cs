using System;
using System.ComponentModel;

namespace Common.Core.Extension
{
    public static class AttributeExtensions
    {
        public static string ToDescription(this Enum value)
        {
            var da = (DescriptionAttribute[])(value.GetType().GetField(value.ToString())).GetCustomAttributes(typeof(DescriptionAttribute), false);
            return da.Length > 0 ? da[0].Description : value.ToString();
        }

        public static string ToDefaultValue(this Enum value)
        {
            var da = (DefaultValueAttribute[])(value.GetType().GetField(value.ToString())).GetCustomAttributes(typeof(DefaultValueAttribute), false);
            return da.Length > 0 ? da[0].Value.ToString() : value.ToString();
        }
    }
}
