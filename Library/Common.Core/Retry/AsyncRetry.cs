using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Common.Core.Retry
{
    public class AsyncRetry
    {
        public async Task DoAsync(Func<Task> action, AsyncRetryPolicy policy = null, CancellationToken? cancellationToken = null)
        {
            await DoAsync(async () => {
                await action();
                return true;
            }, policy, cancellationToken);
        }

        public async Task<T> DoAsync<T>(Func<Task<T>> action, AsyncRetryPolicy policy = null, CancellationToken? cancellationToken = null)
        {
            policy = policy ?? new AsyncRetryPolicy();
            cancellationToken = cancellationToken ?? CancellationToken.None;

            var uniqueExceptions = new Dictionary<string, Exception>();

            for (var retry = 0; retry < policy.RetryCount; retry++)
            {
                try
                {
                    cancellationToken.Value.ThrowIfCancellationRequested();

                    return await action();
                }
                catch (Exception ex) when (!(ex is OperationCanceledException) && policy.ExceptionFilter(ex))
                {
                    if (!uniqueExceptions.ContainsKey(ex.Message))
                        uniqueExceptions.Add(ex.Message, ex);

                    if (retry < policy.RetryCount - 1)
                    {
                        try
                        {
                            policy.OnExceptionAction(ex);
                        }
                        catch (Exception) { }

                        await Task.Delay(policy.RetryInterval, cancellationToken.Value);
                    }
                }
            }

            throw new AggregateException(uniqueExceptions.Values);
        }
    }
}
