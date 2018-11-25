namespace Common.Core.WebAPI.Result
{
    public class ApiResult
    {
        public bool Success { get; set; }
        public object Message { get; set; }
    }

    public class ApiResult<T> : ApiResult
    {
        public T Data { get; set; }
    }
}
