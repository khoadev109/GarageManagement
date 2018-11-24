using Castle.Windsor;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;

namespace Common.Core.Dependency
{
    public class WindsorInstaller : IWindsorInstaller
    {
        public virtual void Install(IWindsorContainer container, IConfigurationStore store)
        {

        }
    }
}
