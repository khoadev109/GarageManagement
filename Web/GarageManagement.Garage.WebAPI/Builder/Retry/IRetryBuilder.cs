﻿using System;
using System.Threading;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Result;

namespace GarageManagement.Garage.WebAPI.Builder.Retry
{
    public interface IRetryBuilder<T>
    {
        Parameter<T> Parameter { get; }
        void BuildActionInvoker(Func<Task<DataResult<T>>> actionInvoker);
        void BuildCancellationToken(CancellationToken cancellationToken);
        void BuildRetryCount(int retryCount);
        void BuildRetryInterval(TimeSpan retryInterval);
    }
}
