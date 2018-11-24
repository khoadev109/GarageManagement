using System;
using System.Collections.Generic;
using System.Reflection;

namespace Common.Core.Extension.Reflection
{
    public static class ReflectionExtensions
    {
        public static object[] GetPropertyValues<T>(string[] propertyNames)
        {
            List<object> values = new List<object>();

            var propertyInfos = GetProperties<T>(propertyNames);
            propertyInfos.ForEach(x => {
                var value = x.GetValue(typeof(T), null);
                values.Add(value);
            });

            return values.ToArray();
        }

        public static PropertyInfo[] GetProperties<T>(string[] propertyNames)
        {
            List<PropertyInfo> infos = new List<PropertyInfo>();

            propertyNames.ForEach(x => {
                var info = GetProperty<T>(x);
                infos.Add(info);
            });

            return infos.ToArray();
        }

        public static object GetPropertyValue<T>(string propertyName)
        {
            var value = GetProperty<T>(propertyName).GetValue(typeof(T), null);
            return value;
        }

        public static PropertyInfo GetProperty<T>(string propertyName)
        {
            PropertyInfo propertyInfo = null;

            string[] nameParts = propertyName.Split('.');
            if (nameParts.Length == 1)
            {
                propertyInfo = typeof(T).GetProperty(propertyName);
            }
            else
            {
                foreach (string part in nameParts)
                {
                    Type type = typeof(T);
                    PropertyInfo info = type.GetProperty(part);

                    if (info == null)
                        return null;

                    propertyInfo = info;
                }
            }
            return propertyInfo;
        }
    }
}
