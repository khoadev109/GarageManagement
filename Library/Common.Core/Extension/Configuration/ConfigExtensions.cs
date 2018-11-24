using System;
using System.Configuration;

namespace Common.Core.Extension
{
    public static class ConfigExtensions
    {
        private static T ConvertType<T>(object value)
        {
            return (T)Convert.ChangeType(value, typeof(T));
        }

        private static T GetAppSettingValueByType<T>(string key)
        {
            try
            {
                var value = ConfigurationManager.AppSettings[key];
                T convertedValue = !string.IsNullOrEmpty(value) ? ConvertType<T>(value) : default(T);
                return convertedValue;
            }
            catch (ArgumentException ex)
            {
                return default(T);
                // Log exception here
            }
        }

        public static int GetAppSettingValueByInteger(string key)
        {
            return GetAppSettingValueByType<int>(key);
        }

        public static double GetAppSettingValueByDouble(string key)
        {
            return GetAppSettingValueByType<double>(key);
        }

        public static float GetAppSettingValueByFloat(string key)
        {
            return GetAppSettingValueByType<float>(key);
        }
        
        public static decimal GetAppSettingValueByDecimal(string key)
        {
            return GetAppSettingValueByType<decimal>(key);
        }

        public static bool GetAppSettingValueByBoolean(string key)
        {
            return GetAppSettingValueByType<bool>(key);
        }

        public static string GetAppSettingValueByString(string key)
        {
            return GetAppSettingValueByType<string>(key);
        }

        public static string[] GetAppSettingValueByStringArray(string key, char splitCharacter = ',')
        {
            try
            {
                string[] stringArrayValue = new string[] { };
                var value = ConfigurationManager.AppSettings[key];
                if (!string.IsNullOrEmpty(value))
                {
                    var arrayValues = value.Split(new char [ splitCharacter ], StringSplitOptions.RemoveEmptyEntries);
                    if (arrayValues != null && arrayValues.Length > 0)
                        stringArrayValue = ConvertType<string[]>(arrayValues);
                }

                return stringArrayValue;
            }
            catch (ArgumentException ex)
            {
                return null;
                // Log exception here
            }
        }
    }
}
