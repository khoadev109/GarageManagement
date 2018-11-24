using System;
using NHibernate.Cache;
using System.Runtime.Caching;
using System.Collections.Generic;
using Vendare.Utils;
using Vendare.Error;
using System.Collections.Specialized;
using System.Collections;

namespace Common.Core.Nhibernate.CachingConfiguration.RtMemoryCache
{
    /// <summary>
	/// Pluggable cache implementation using the System.Runtime.Caching classes
	/// </summary>
	public class RtMemoryCache : ICache
    {
        private readonly string region;
        private string regionPrefix;
        private readonly ObjectCache cache;
        private TimeSpan expiration;
        private CacheItemPriority priority;
        // The name of the cache key used to clear the cache. All cached items depend on this key.
        private readonly string rootCacheKey;
        private bool rootCacheKeyStored;
        private static readonly TimeSpan DefaultExpiration = TimeSpan.FromSeconds(300);
        private static readonly string DefauktRegionPrefix = string.Empty;
        private const string CacheKeyPrefix = "NHibernate-Cache:";

        /// <summary>
        /// default constructor
        /// </summary>
        public RtMemoryCache()
            : this("nhibernate", null)
        {
        }

        /// <summary>
        /// constructor with no properties
        /// </summary>
        /// <param name="region"></param>
        public RtMemoryCache(string region)
            : this(region, null)
        {
        }

        /// <summary>
        /// full constructor
        /// </summary>
        /// <param name="region"></param>
        /// <param name="properties">cache configuration properties</param>
        /// <remarks>
        /// There are two (2) configurable parameters:
        /// <ul>
        ///		<li>expiration = number of seconds to wait before expiring each item</li>
        ///		<li>priority = a numeric cost of expiring each item, where 1 is a low cost, 5 is the highest, and 3 is normal. Only values 1 through 5 are valid.</li>
        /// </ul>
        /// All parameters are optional. The defaults are an expiration of 300 seconds and the default priority of 3.
        /// </remarks>
        /// <exception cref="IndexOutOfRangeException">The "priority" property is not between 1 and 5</exception>
        /// <exception cref="ArgumentException">The "expiration" property could not be parsed.</exception>
        public RtMemoryCache(string region, IDictionary<string, string> properties)
        {
            this.region = region;
            cache = MemoryCache.Default;
            Configure(properties);

            rootCacheKey = GenerateRootCacheKey();
            StoreRootCacheKey();
        }

        public string Region
        {
            get { return region; }
        }

        public TimeSpan Expiration
        {
            get { return expiration; }
        }

        public CacheItemPriority Priority
        {
            get { return priority; }
        }

        private void Configure(IDictionary<string, string> props)
        {
            if (props == null)
            {
                expiration = DefaultExpiration;
                priority = CacheItemPriority.Default;
                regionPrefix = DefauktRegionPrefix;
            }
            else
            {
                priority = GetPriority(props);
                expiration = GetExpiration(props);
                regionPrefix = GetRegionPrefix(props);
            }
        }

        private static string GetRegionPrefix(IDictionary<string, string> props)
        {
            string result;
            if (props.TryGetValue("regionPrefix", out result))
                LogWriter.Write(LogLevel.Info, "New regionPrefix :{0}", result);
            else
            {
                result = DefauktRegionPrefix;
                LogWriter.Write(LogLevel.Info, "No regionPrefix value given, using defaults");
            }
            return result;
        }

        private static TimeSpan GetExpiration(IDictionary<string, string> props)
        {
            TimeSpan result = DefaultExpiration;
            string expirationString;
            if (!props.TryGetValue("expiration", out expirationString))
            {
                props.TryGetValue(NHibernate.Cfg.Environment.CacheDefaultExpiration, out expirationString);
            }

            if (expirationString != null)
            {
                try
                {
                    int seconds = Convert.ToInt32(expirationString);
                    result = TimeSpan.FromSeconds(seconds);
                    LogWriter.Write(LogLevel.Info, "GetExpiration: ", "new expiration value: " + seconds);
                }
                catch (Exception ex)
                {
                    LogWriter.Write(LogLevel.Info, "GetExpiration: ", "error parsing expiration value");
                    new LoggableException(ex, new NameValueCollection
                    {
                        { "GetExpiration", string.Format("Error parsing expiration value: {0}", ex.ToString()) }
                    });
                    throw new ArgumentException("Could not parse 'expiration' as a number of seconds", ex);
                }
            }
            else
                LogWriter.Write(LogLevel.Info, "GetExpiration: ", "No expiration value given, using defaults");

            return result;
        }

        private static CacheItemPriority GetPriority(IDictionary<string, string> props)
        {
            CacheItemPriority result = CacheItemPriority.Default;
            string priorityString;
            if (props.TryGetValue("priority", out priorityString))
            {
                result = ConvertCacheItemPriorityFromXmlString(priorityString);
                LogWriter.Write(LogLevel.Info, string.Format("New priority: {0}", result));
            }
            return result;
        }

        private static CacheItemPriority ConvertCacheItemPriorityFromXmlString(string priorityString)
        {
            if (string.IsNullOrEmpty(priorityString))
                return CacheItemPriority.Default;
            
            var ps = priorityString.Trim().ToLowerInvariant();
            if (ps.Length == 1 && char.IsDigit(priorityString, 0))
            {
                // the priority is specified as a number
                int priorityAsInt = int.Parse(ps);
                if (priorityAsInt >= 1 && priorityAsInt <= 6)
                {
                    return (CacheItemPriority)priorityAsInt;
                }
            }
            else
            {
                switch (ps)
                {
                    case "default":
                        return CacheItemPriority.Default;
                    case "notremovable":
                        return CacheItemPriority.NotRemovable;
                }
            }
            LogWriter.Write(LogLevel.Info, string.Format("Priority value out of range: {0}", priorityString));
            throw new IndexOutOfRangeException("Priority must be a valid System.Runtime.Caching.CacheItemPriority; was: " + priorityString);
        }

        private string GetCacheKey(object key)
        {
            return String.Concat(CacheKeyPrefix, regionPrefix, region, ":", key.ToString(), "@", key.GetHashCode());
        }

        public object Get(object key)
        {
            if (key == null)
                return null;

            string cacheKey = GetCacheKey(key);
            LogWriter.Write(LogLevel.Info, string.Format("Fetching object '{0}' from the cache.", cacheKey));

            object obj = cache.Get(cacheKey);
            if (obj == null)
                return null;

            var de = (DictionaryEntry)obj;
            if (key.Equals(de.Key))
                return de.Value;
            else
                return null;
        }

        public void Put(object key, object value)
        {
            if (key == null)
                throw new ArgumentNullException("key", "null key not allowed");

            if (value == null)
                throw new ArgumentNullException("value", "null value not allowed");

            string cacheKey = GetCacheKey(key);
            if (cache[cacheKey] != null)
            {
                LogWriter.Write(LogLevel.Info, string.Format("updating value of key '{0}' to '{1}'.", cacheKey, value));
                // Remove the key to re-add it again below
                cache.Remove(cacheKey);
            }
            else
            {
                LogWriter.Write(LogLevel.Info, string.Format("adding new data: key={0}&value={1}", cacheKey, value));
            }

            if (!rootCacheKeyStored)
            {
                StoreRootCacheKey();
            }

            cache.Add(cacheKey, new DictionaryEntry(key, value),
                      new CacheItemPolicy
                      {
                          AbsoluteExpiration = DateTime.Now.Add(expiration),
                          Priority = priority,
                          SlidingExpiration = ObjectCache.NoSlidingExpiration,
                          ChangeMonitors = { cache.CreateCacheEntryChangeMonitor(new[] { rootCacheKey }) }
                      });
        }

        public void Remove(object key)
        {
            if (key == null)
                throw new ArgumentNullException("key");

            string cacheKey = GetCacheKey(key);
            LogWriter.Write(LogLevel.Info, string.Format("removing item with key: ", cacheKey));
            cache.Remove(cacheKey);
        }

        public void Clear()
        {
            RemoveRootCacheKey();
            StoreRootCacheKey();
        }

        /// <summary>
        /// Generate a unique root key for all cache items to be dependant upon
        /// </summary>
        private string GenerateRootCacheKey()
        {
            return GetCacheKey(Guid.NewGuid());
        }

        private void RootCacheItemRemoved(CacheEntryRemovedArguments arguments)
        {
            rootCacheKeyStored = false;
        }

        private void StoreRootCacheKey()
        {
            rootCacheKeyStored = true;
            cache.Add(
                rootCacheKey,
                rootCacheKey,
                new CacheItemPolicy
                {
                    AbsoluteExpiration = ObjectCache.InfiniteAbsoluteExpiration,
                    SlidingExpiration = ObjectCache.NoSlidingExpiration,
                    Priority = CacheItemPriority.Default,
                    RemovedCallback = RootCacheItemRemoved
                });
        }

        private void RemoveRootCacheKey()
        {
            cache.Remove(rootCacheKey);
        }

        public void Destroy()
        {
            Clear();
        }

        public void Lock(object key)
        {
            // Do nothing
        }

        public void Unlock(object key)
        {
            // Do nothing
        }

        public long NextTimestamp()
        {
            return Timestamper.Next();
        }

        public int Timeout
        {
            get { return Timestamper.OneMs * 60000; } // 60 seconds
        }

        public string RegionName
        {
            get { return region; }
        }
    }
}
