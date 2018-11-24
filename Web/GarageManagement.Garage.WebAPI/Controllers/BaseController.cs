using System;
using System.Net;
using System.Web;
using System.Linq;
using System.Web.Http;
using System.Threading;
using Common.Core.Retry;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.Garage.WebAPI.Builder.Retry;
using GarageManagement.Garage.WebAPI.Builder.Service;
using static Common.Core.WebAPI.Authentication.Utilities.ClaimExtension;
using static Common.Core.Log.LogOutput;
using Serilog;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    public class BaseController : ApiController
    {
        private readonly AsyncRetry _asyncRetry;
        private IAuthenticationManager AuthenticationManager => HttpContext.Current.GetOwinContext().Authentication;

        protected DependencyParameter dependency;
        protected readonly IServiceBuilder serviceBuilder;

        public int UserId => HttpContext.Current.User.Identity.GetUserId<int>();

        public BaseController()
        {
            _asyncRetry = new AsyncRetry();
            serviceBuilder = new ServiceBuilder();
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

        protected List<Claim> GetAllClaims()
        {
            return GetClaims();
        }

        protected string GetClaimValueByType(Func<Claim, bool> predicate)
        {
            var claims = GetClaims();
            var claimValue = claims.FirstOrDefault(predicate)?.Value;
            return claimValue;
        }

        protected Result ErrorResult(string errorMessage)
        {
            var result = new Result { Success = false, Message = errorMessage };
            return result;
        }

        protected Result ErrorResult(List<ErrorDescriber> errorMessages)
        {
            var result = new Result { Success = false, Message = errorMessages };
            return result;
        }

        protected Result<T> SuccessResult<T>(T data, string message = "")
        {
            var result = new Result<T> { Success = true, Message = message, Data = data, };
            return result;
        }

        protected Result SuccessResult(string message = "")
        {
            var result = new Result { Success = true, Message = message };
            return result;
        }
    }

    public class Result
    {
        public bool Success { get; set; }
        public object Message { get; set; }
    }

    public class Result<T> : Result
    {
        public T Data { get; set; }
    }
}
