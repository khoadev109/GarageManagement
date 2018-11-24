using System.IO;
using System.Threading;

namespace Vienauto.Library.IO
{
    public class Streamer
    {
        private const int MAX_RETRY = 10;

        public StreamReader AcquireReader(string fullFilePath, int retryTimes = MAX_RETRY)
        {
            var retry = 0;
            while (retry < retryTimes)
            {
                try
                {
                    var streamReader = new StreamReader(fullFilePath);
                    streamReader.BaseStream.Position = 0;
                    return streamReader;
                }
                catch (System.Exception ex)
                {
                    retry++;
                    if (retry > retryTimes)
                    {

                    }
                    //Configuration.WriteEventLogEntry("Unable to acquire reader " + fullFilePath, ex);
                    else
                        Thread.Sleep(500);
                }
            }
            return null;
        }

        public StreamWriter AcquireWriter(string fullFilePath, bool append = true, int retryTimes = MAX_RETRY)
        {
            var retry = 0;
            while (retry < retryTimes)
            {
                try
                {
                    return new StreamWriter(fullFilePath, append);
                }
                catch (System.Exception ex)
                {
                    retry++;
                    if (retry > retryTimes)
                    {

                    }
                    //Configuration.WriteEventLogEntry("Unable to acquire reader " + fullFilePath, ex);
                    else
                        Thread.Sleep(500);
                }
            }
            return null;
        }
    }
}
