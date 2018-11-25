using System;
using System.Threading;
using System.Threading.Tasks;
using Common.Core.WebAPI.Result;

namespace DesignPattern.Builder.Retry
{
    public class RetryBuilder<T> : IRetryBuilder<T>
    {
        private readonly Parameter<T> _parameter;

        public Parameter<T> Parameter
        {
            get { return _parameter; }
        }

        public RetryBuilder()
        {
            _parameter = new Parameter<T>();
        }

        public void BuildActionInvoker(Func<Task<DataResult<T>>> actionInvoker)
        {
            _parameter.ActionInvoker = actionInvoker;
        }

        public void BuildCancellationToken(CancellationToken cancellationToken)
        {
            _parameter.CancellationToken = cancellationToken;
        }

        public void BuildRetryCount(int retryCount)
        {
            _parameter.RetryCount = retryCount;
        }

        public void BuildRetryInterval(TimeSpan retryInterval)
        {
            _parameter.RetryInterval = retryInterval;
        }
    }
}
