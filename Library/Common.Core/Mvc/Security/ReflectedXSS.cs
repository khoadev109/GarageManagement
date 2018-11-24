using System.Web;
using Microsoft.Security.Application;

namespace Common.Core.Mvc.Security
{
    public static class ReflectedXSS
    {
        public static string EncodeJavascriptContent(string content)
        {
            var encodedContent = Encoder.JavaScriptEncode(content, false);
            return encodedContent;
        }

        public static string EncodeHtmlContent(string content)
        {
            var encodedContent = HttpUtility.HtmlEncode(content);
            return encodedContent;
        }
    }
}
