using System;
using System.Linq;
using Castle.Windsor;
using Castle.MicroKernel;
using Castle.Windsor.Configuration.Interpreters;
using Castle.MicroKernel.Resolvers.SpecializedResolvers;

namespace Common.Core.Dependency
{
    public class WindsorDependencyResolver : DependencyResolver<IWindsorContainer>
    {
        public WindsorDependencyResolver()
        {
            try
            {
                _container = new WindsorContainer(new XmlInterpreter());
            }
            catch (System.Exception ex)
            {
                //if (ex.Message == "Could not find section 'castle' in the configuration file associated with this domain.")
                //    _container = new WindsorContainer();
                //else
                //    throw;
                _container = new WindsorContainer();
            }
            _container.Kernel.Resolver.AddSubResolver(new ArrayResolver(_container.Kernel));
            _container.Kernel.Resolver.AddSubResolver(new CollectionResolver(_container.Kernel, true));
        }

        public override T[] ResolveAll<T>()
        {
            if (CanResolve<T>())
                return _container.ResolveAll<T>();
            return new T[0];
        }

        public override T Resolve<T>()
        {
            if (CanResolve<T>())
                return _container.Resolve<T>();
            return default(T);
        }

        public override object Resolve(Type type)
        {
            if (CanResolve(type))
                return _container.Kernel.Resolve(type);
            return null;
        }

        public override object[] ResolveAll(Type type)
        {
            if (CanResolve(type))
                return _container.ResolveAll(type).Cast<object>().ToArray();
            return new object[0];
        }

        /// <summary>
        /// Uses the type to check if an object is registered with the IoC container
        /// </summary>
        /// <returns></returns>
        public override bool CanResolve<T>()
        {
            return CanResolve(typeof(T));
        }

        /// <summary>
        /// Uses the type to check if a type of object is registered with the IoC container
        /// </summary>
        public override bool CanResolve(Type type)
        {
            return _container.Kernel.HasComponent(type);
        }

        /// <summary>
        /// Release an object from the container
        /// </summary>
        /// <param name="component"></param>
        public override void Release(object component)
        {
            _container.Release(component);
        }
    }
}
