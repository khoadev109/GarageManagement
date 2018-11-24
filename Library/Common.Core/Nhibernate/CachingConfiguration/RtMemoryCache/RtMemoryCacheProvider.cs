using System.Collections.Generic;
using System.Configuration;
using System.Text;
using NHibernate.Cache;

namespace Common.Core.Nhibernate.CachingConfiguration.RtMemoryCache
{
    /// <summary>
	/// Cache provider using the System.Runtime.Caching classes
	/// </summary>
	public class RtMemoryCacheProvider : ICacheProvider
    {
        private static readonly Dictionary<string, ICache> caches;
        
        static RtMemoryCacheProvider()
        {            
            caches = new Dictionary<string, ICache>();

            var list = ConfigurationManager.GetSection("rtmemorycache") as CacheConfig[];
            if (list != null)
            {
                foreach (CacheConfig cache in list)
                {
                    caches.Add(cache.Region, new RtMemoryCache(cache.Region, cache.Properties));
                }
            }
        }

        #region ICacheProvider Members

        /// <summary>
        /// build a new RtMemoryCache
        /// </summary>
        /// <param name="regionName"></param>
        /// <param name="properties"></param>
        /// <returns></returns>
        public ICache BuildCache(string regionName, IDictionary<string, string> properties)
        {
            if (regionName == null)
                regionName = string.Empty;

            ICache result;
            if (caches.TryGetValue(regionName, out result))
                return result;

            // create cache
            if (properties == null)
                properties = new Dictionary<string, string>(1);

            return new RtMemoryCache(regionName, properties);
        }

        public long NextTimestamp()
        {
            return Timestamper.Next();
        }

        public void Start(IDictionary<string, string> properties) { }

        public void Stop() { }

        #endregion
    }
}
