namespace GarageManagement.ServiceInterface.Result
{
    public class DataResult<T> : ErrorLog
    {
        public T Target { get; set; }

        public bool HasErrors
        {
            get { return Errors.Count > 0 ? true : false; }
        }
    }
}
