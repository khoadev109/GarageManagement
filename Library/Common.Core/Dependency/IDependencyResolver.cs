using System;

namespace Common.Core.Dependency
{
    public interface IDependencyResolver
    {
        T[] ResolveAll<T>();
        T Resolve<T>();
        object Resolve(Type type);
        object[] ResolveAll(Type type);
        bool CanResolve(Type type);
        bool CanResolve<T>();
        void Release(object o);
    }

    public interface IDependencyResolver<TContainer> : IDependencyResolver
    {
        TContainer Container { get; }
    }

    public abstract class DependencyResolver<TContainer> : IDependencyResolver<TContainer>
    {
        protected TContainer _container;
        public virtual TContainer Container
        {
            get
            {
                return _container;
            }
        }

        public abstract T[] ResolveAll<T>();
        public abstract T Resolve<T>();
        public abstract object Resolve(Type type);
        public abstract object[] ResolveAll(Type type);
        public abstract void Release(object o);
        public abstract bool CanResolve(Type type);
        public virtual bool CanResolve<T>()
        {
            return CanResolve(typeof(T));
        }
    }
}
