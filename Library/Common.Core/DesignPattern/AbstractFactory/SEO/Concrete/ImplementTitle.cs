using Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Interface;

namespace Common.Core.Extension.DesignPattern.AbstractFactory.SEO.Concrete
{
    public class ImplementTitle : Title
    {
        public string DisplayHeader(string content)
        {
            return content;
        }
    }
}
