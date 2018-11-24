using System;
using System.Web;
using NHibernate;
using System.Linq;
using NHibernate.Cfg;
using NHibernate.Util;
using System.Reflection;
using NHibernate.Context;
using NHibernate.Mapping.ByCode;
using System.Collections.Generic;
using NHibernate.Cfg.MappingSchema;
using Common.Core.Nhibernate.CachingConfiguration;

namespace Common.Core.Nhibernate.Context
{
    public class NhibernateConfiguration
    {
        private const string CONFIG_CACHE_KEY = "NhibernateConfig";
        internal const string DefaultFactoryKey = "Nhibernate.DefaultFactoryKey";
        private static readonly IDictionary<string, ISessionFactory> sessionFactories;

        static NhibernateConfiguration()
        {
            sessionFactories = new Dictionary<string, ISessionFactory>();
        }

        private static Configuration GetConfigCurrentContext(string configFile) 
        {
            var configuration = new Configuration();
            return HttpContext.Current != null ? configuration.Configure(configFile)
                    .CurrentSessionContext<WebSessionContext>() : configuration.Configure(configFile).CurrentSessionContext<ThreadLocalSessionContext>();
        }

        public static void Init(string sessionFactoryKey, string configFile, Assembly mappingAssembly)
        {
            var cache = new NHibernateConfigurationFileCache();
            var mappingAssemblies = new[] {
                mappingAssembly.GetName().Name
            };

            var configuration = cache.LoadConfiguration(CONFIG_CACHE_KEY, null, mappingAssemblies, mappingAssembly);

            if (configuration == null)
            {
                configuration = GetConfigCurrentContext(configFile);
                var mapping = GetMappings(mappingAssembly);
                configuration.AddMapping(mapping);
                cache.SaveConfiguration(CONFIG_CACHE_KEY, configuration, mappingAssembly);
            }
            var sessionFactory = configuration.BuildSessionFactory();
            sessionFactories.Add(sessionFactoryKey, sessionFactory);
        }

        public static void Init(string configFile, Assembly mappingAssembly)
        {
            Init(DefaultFactoryKey, configFile, mappingAssembly);
        }

        private static HbmMapping GetMappings(Assembly assembly)
        {
            var mapper = new ModelMapper();
            mapper.AddMappings(assembly.GetExportedTypes());
            var mapping = mapper.CompileMappingForAllExplicitlyAddedEntities();
            return mapping;
        }

        public static IEnumerable<ISessionFactory> GetSessionFactories()
        {
            var readonlyFactories = new List<ISessionFactory>();

            sessionFactories.ForEach(p => readonlyFactories.Add(p.Value));

            if (sessionFactories == null || !sessionFactories.Any())
                throw new TypeLoadException("At least one ISessionFactory has not been registered with IoC");

            return readonlyFactories;
        }

        public static ISessionFactory GetDefaultSessionFactory()
        {
            return GetSessionFactory(DefaultFactoryKey);
        }

        public static ISessionFactory GetSessionFactory(string factoryKey)
        {
            ISessionFactory sessionFactory;
            if (sessionFactories.TryGetValue(factoryKey, out sessionFactory))
                return sessionFactory;

            throw new TypeLoadException("factoryKey not found");

        }
    }
}
