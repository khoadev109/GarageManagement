using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace Common.Core.Extension
{
    public class EnumOption<TEnum>
        where TEnum : struct
    {
        public string Display { get; set; }
        public TEnum? Enum { get; set; }
        public int Value { get; set; }
        public bool Selected { get; set; }
    }

    public static class EnumExtensions
    {
        public static string GetDescription<T>(this T? enumerationValue, string @default = "Chưa xác định")
            where T : struct
        {
            if (enumerationValue == null)
                return @default;
            return enumerationValue.Value.GetDescription(@default);
        }

        public static string GetDescription<T>(this T enumerationValue, string @default = "Chưa xác định")
            where T : struct
        {
            var type = enumerationValue.GetType();
            if (!type.IsEnum)
                throw new ArgumentException("EnumerationValue must be of Enum type", "enumerationValue");

            var memberInfo = type.GetMember(enumerationValue.ToString());
            if (memberInfo != null && memberInfo.Length > 0)
            {
                object[] attrs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attrs != null && attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }
            return @default;
        }

        public static IList<EnumOption<T>> EnumToSelectList<T>(this T @enum, string @default = "--Chọn--")
            where T : struct
        {
            var items = new List<EnumOption<T>>();
            var values = Enum.GetValues(typeof(T)).Cast<T>();
            values.ForEach(v => items.Add(new EnumOption<T> { Enum = v, Value = v.GetHashCode(), Display = v.GetDescription() }));
            items.Insert(0, new EnumOption<T> { Value = 0, Display = @default });
            return items;
        }
    }
}
