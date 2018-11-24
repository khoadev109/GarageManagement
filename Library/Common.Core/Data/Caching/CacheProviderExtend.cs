using System;
using System.Web;
using System.Web.Caching;

namespace Common.Core.Data.Caching
{
    public interface ICacheProvider<U, T>
    {
        T Fetch(string key, U paramData, Func<U, T> retrieveData, DateTime? absoluteExpiry, TimeSpan? relativeExpiry);
    }

    public partial class CacheProvider<U, T> : ICacheProvider<U, T>
    {
        public T Fetch(string key, U paramData, Func<U, T> retrieveData, DateTime? absoluteExpiry, TimeSpan? relativeExpiry)
        {
            return FetchAndCache<T>(key, paramData, retrieveData, absoluteExpiry, relativeExpiry);
        }

        private T FetchAndCache<T>(string key, U paramData, Func<U, T> retrieveData, DateTime? absoluteExpiry, TimeSpan? relativeExpiry)
        {
            T value;
            if (!TryGetValue<T>(key, out value))
            {
                value = retrieveData(paramData);
                if (!absoluteExpiry.HasValue)
                    absoluteExpiry = Cache.NoAbsoluteExpiration;

                if (!relativeExpiry.HasValue)
                    relativeExpiry = Cache.NoSlidingExpiration;

                HttpContext.Current.Cache.Insert(key, value, null, absoluteExpiry.Value, relativeExpiry.Value);
            }
            return value;
        }

        private bool TryGetValue<T>(string key, out T value)
        {
            object cachedValue = HttpContext.Current.Cache.Get(key);
            if (cachedValue == null)
            {
                value = default(T);
                return false;
            }
            else
            {
                try
                {
                    value = (T)cachedValue;
                    return true;
                }
                catch
                {
                    value = default(T);
                    return false;
                }
            }
        }
    }
}
