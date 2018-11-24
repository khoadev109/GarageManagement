using System;

namespace Common.Core.Retry
{
    public class AsyncRetryPolicy
    {
        public int RetryCount { get; set; }

        public TimeSpan RetryInterval { get; set; }

        public Action<Exception> OnExceptionAction { get; set; }

        public Func<Exception, bool> ExceptionFilter { get; set; }

        public AsyncRetryPolicy(int retryCount = 3,
                                TimeSpan? retryInterval = null,
                                Func<Exception, bool> exceptionFilter = null,
                                Action<Exception> onExceptionAction = null)
        {
            RetryCount = retryCount;
            RetryInterval = retryInterval ?? TimeSpan.FromSeconds(3);
            ExceptionFilter = exceptionFilter ?? (ex => true);
            OnExceptionAction = onExceptionAction ?? (ex => { });
        }
    }
}
