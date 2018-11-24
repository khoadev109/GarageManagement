using Serilog;

namespace Common.Core.Log
{
    public enum LogType
    {
        ERROR = 0,
        INFO = 1,
        DEBUG = 2,
        FATAL = 3,
        WARNING = 4
    }

    public static class LogOutput
    {
        private static readonly ILogger log = new LoggerConfiguration()
                .ReadFrom.AppSettings()
                .CreateLogger();

        public enum IntializationType
        {
            StartStop,
            Initialize
        }

        public static string PrintStartLog(this string intializeObject, bool isEnd = false)
        {
            return PrintLog(intializeObject, IntializationType.StartStop, isEnd);
        }

        public static string PrintInitializeLog(this string intializeObject, bool isEnd = false)
        {
            return PrintLog(intializeObject, IntializationType.Initialize, isEnd);
        }

        public static string PrintLog(this string intializeObject, IntializationType initializationType, bool isEnd)
        {
            var initializeLogMessage = string.Empty;
            if (initializationType == IntializationType.StartStop)
                initializeLogMessage = isEnd ? "STOPPED " : "STARTING ";

            if (initializationType == IntializationType.Initialize)
                initializeLogMessage = isEnd ? "INITIALIZED " : "INITIALIZING ";

            var outputLogMessage = initializeLogMessage + intializeObject;
            return outputLogMessage;
        }

        public static string PrintErrorLog(string message)
        {
            return "Error happens when " + message;
        }

        public static ILogger BindLogContext<T>(this ILogger logger) where T : class
        {
            logger = logger.ForContext("Source", $"{nameof(T)}.cs");
            return logger;
        }

        public static void WriteLog(string message, LogType type)
        {
            switch (type)
            {
                case LogType.ERROR:
                    log.Error(message);
                    break;
                case LogType.INFO:
                    log.Information(message);
                    break;
                case LogType.DEBUG:
                    log.Debug(message);
                    break;
                case LogType.FATAL:
                    log.Fatal(message);
                    break;
                case LogType.WARNING:
                    log.Warning(message);
                    break;
                default:
                    break;
            }
        }
    }
}
