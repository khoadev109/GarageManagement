using Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Interface;

namespace Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Concrete
{
    public class ImplementModule : Component
    {
        public Title GetTitle()
        {
            return new ImplementTitle();
        }

        public Description GetDescription()
        {
            return new ImplementDescription();
        }
    }
}
