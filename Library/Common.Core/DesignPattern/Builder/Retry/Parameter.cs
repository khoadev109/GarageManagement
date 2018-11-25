using System;
using System.Threading;
using System.Threading.Tasks;
using Common.Core.WebAPI.Result;

namespace DesignPattern.Builder.Retry
{
    public class Parameter<T>
    {
        public int RetryCount { get; set; }
        public TimeSpan RetryInterval { get; set; }
        public CancellationToken CancellationToken { get; set; }
        public Func<Task<DataResult<T>>> ActionInvoker { get; set; }
    }
}
