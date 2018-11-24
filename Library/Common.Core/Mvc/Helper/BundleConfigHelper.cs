using System.IO;
using System.Linq;
using System.Web.Hosting;
using Common.Core.Extension;

namespace Common.Core.Mvc.Helper
{
    public enum BundConfigType
    {
        Css,
        Js
    }

    public class BundleConfigHelper
    {
        private const string defaultJsFilePath = "~/Assets/js";
        private const string defaultCssFilePath = "~/Assets/css";

        public static string[] GetVirtualPaths(BundConfigType type, string folderName)
        {
            string[] filePaths = null;
            var folder = ConfigExtensions.GetAppSettingValueByString(folderName);

            if (type == BundConfigType.Css)
            {
                var cssDirectory = string.Concat(defaultCssFilePath, folder);
                var directory = HostingEnvironment.MapPath(cssDirectory);
                filePaths = new DirectoryInfo(directory).EnumerateFiles("*.*", SearchOption.AllDirectories)
                                                        .Where(d => d.Name.EndsWith(".css") || d.Name.EndsWith(".map") || d.Name.EndsWith(".less"))
                                                        .Select(d => string.Concat(cssDirectory, d.Name)).ToArray();
            }
            else if (type == BundConfigType.Js) 
            {
                var jsDirectory = string.Concat(defaultJsFilePath, folder);
                var directory = HostingEnvironment.MapPath(jsDirectory);
                filePaths = new DirectoryInfo(directory).GetFiles("*.js", SearchOption.TopDirectoryOnly)
                                                        .Select(d => string.Concat(jsDirectory, d.Name)).ToArray();
            }
            return filePaths;
        }
    }
}
