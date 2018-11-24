using System;

namespace GarageManagement.ServiceInterface.Result
{
    public class ErrorDescriber
    {
        public string ErrorMessage { get; set; }
        public Exception Exception { get; set; }

        public ErrorDescriber()
        {
            Exception = null;
        }

        public ErrorDescriber(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public ErrorDescriber(Exception exception)
        {
            Exception = exception;
        }

        public ErrorDescriber(string errorMessage, Exception exception)
        {
            Exception = exception;
            ErrorMessage = errorMessage;
        }
    }
}
