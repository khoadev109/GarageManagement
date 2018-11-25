using System;
using System.Collections.Generic;

namespace Common.Core.WebAPI.Result
{
    public class ErrorLog
    {
        public List<ErrorDescriber> Errors { get; set; }

        public ErrorLog()
        {
            Errors = new List<ErrorDescriber>();
        }

        public List<ErrorDescriber> AddErrorRange(IEnumerable<ErrorDescriber> ErrorsRange)
        {
            Errors.AddRange(ErrorsRange);
            return Errors;
        }

        public List<ErrorDescriber> AddError(string errorMessage, Exception exception)
        {
            Errors.Add(new ErrorDescriber { ErrorMessage = errorMessage, Exception = exception });
            return Errors;
        }

        public List<ErrorDescriber> AddError(string errorMessage)
        {
            return AddError(errorMessage, null);
        }

        public List<ErrorDescriber> AddError(Exception exception)
        {
            return AddError(string.Empty, exception);
        }
    }
}
