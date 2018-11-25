using System.Web.Http;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using Microsoft.Owin.Security;
using Common.Core.Retry;
using System.Web;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Threading;
using System;
using DesignPattern.Builder.Retry;
using System.Net;
using static Common.Core.Log.LogOutput;

namespace Common.Core.WebAPI.Controllers
{
    public class WebApiController : ApiController
    {
        private readonly AsyncRetry _asyncRetry;
        private IAuthenticationManager AuthenticationManager => HttpContext.Current.GetOwinContext().Authentication;
        public int UserId => HttpContext.Current.User.Identity.GetUserId<int>();

        public WebApiController()
        {
            _asyncRetry = new AsyncRetry();
        }

        [HttpGet]
        protected IHttpActionResult LogOut()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return Ok(SuccessResult());
        }

        protected async Task<IHttpActionResult> ExecuteServiceReturnHttpResult<T>(Func<Task<DataResult<T>>> serviceFunc, Func<Task<T>> callBackFunc = null, bool useRetry = true)
        {
            var result = await (useRetry ? CallAsyncWithRetry(() => serviceFunc()) : serviceFunc());

            if (!result.HasErrors)
            {
                if (callBackFunc != null && result.Target != null)
                {
                    result.Target = await callBackFunc();
                }

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }
            else
            {
                result.Errors.ForEach(x =>
                {
                    WriteLog(x.ErrorMessage, Common.Core.Log.LogType.ERROR);
                });
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        protected async Task<IHttpActionResult> ExecuteServiceReturnDefaultHttpResult<T>(Func<Task<DataResult<T>>> serviceFunc, bool useRetry = true)
        {
            return await ExecuteServiceReturnHttpResult(serviceFunc, useRetry: useRetry);
        }

        protected async Task<T> ExecuteServiceReturnDataResult<T>(Func<Task<DataResult<T>>> serviceFunc, bool useRetry = true)
        {
            var result = await (useRetry ? CallAsyncWithRetry(() => serviceFunc()) : serviceFunc());

            return !result.HasErrors ? result.Target : default(T);
        }

        protected async Task<DataResult<T>> CallAsyncWithRetry<T>(Func<Task<DataResult<T>>> serviceFuncInvoker, CancellationToken? cancellationToken = null, TimeSpan? retryInterval = null, int retryCount = 3)
        {
            IRetryBuilder<T> retryBuilder = new RetryBuilder<T>();
            retryBuilder.BuildActionInvoker(serviceFuncInvoker);
            retryBuilder.BuildCancellationToken(cancellationToken.GetValueOrDefault());
            retryBuilder.BuildRetryCount(retryCount);
            retryBuilder.BuildRetryInterval(retryInterval.HasValue ? retryInterval.Value : TimeSpan.FromSeconds(3));

            var retryPolicy = new AsyncRetryPolicy
            {
                RetryCount = retryBuilder.Parameter.RetryCount,
                RetryInterval = retryBuilder.Parameter.RetryInterval
            };

            var result = await _asyncRetry.DoAsync(serviceFuncInvoker, retryPolicy, retryBuilder.Parameter.CancellationToken);
            return result;
        }

        protected ApiResult ErrorResult(string errorMessage)
        {
            var result = new ApiResult { Success = false, Message = errorMessage };
            return result;
        }

        protected ApiResult ErrorResult(List<ErrorDescriber> errorMessages)
        {
            var result = new ApiResult { Success = false, Message = errorMessages };
            return result;
        }

        protected ApiResult<T> SuccessResult<T>(T data, string message = "")
        {
            var result = new ApiResult<T> { Success = true, Message = message, Data = data, };
            return result;
        }

        protected ApiResult SuccessResult(string message = "")
        {
            var result = new ApiResult { Success = true, Message = message };
            return result;
        }
    }
}
