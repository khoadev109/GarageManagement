using System.Linq;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace Common.Core.Extension
{
    public static class DictionaryExtensions
    {
        public static NameValueCollection Replace(this NameValueCollection current, NameValueCollection replacements)
        {
            foreach (var key in replacements.AllKeys)
            {
                if (current.AllKeys.Contains(key))
                    current[key] = replacements[key];
                else
                    current.Add(key, replacements[key]);
            }
            return current;
        }

        public static string GetValueByKey(this Dictionary<string, object> dictionary, string key)
        {
            if (dictionary.ContainsKey(key))
            {
                return dictionary[key].ToString();
            }
            return string.Empty;
        }
    }
}
