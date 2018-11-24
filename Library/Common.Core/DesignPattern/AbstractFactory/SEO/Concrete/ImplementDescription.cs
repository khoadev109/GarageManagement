using Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Interface;

namespace Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Concrete
{
    public class ImplementDescription : Description
    {
        public string DisplayContent(string content)
        {
            return content;
        }
    }
}
