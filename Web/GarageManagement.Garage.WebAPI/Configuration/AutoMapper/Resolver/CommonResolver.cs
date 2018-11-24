using AutoMapper;
using System;
using System.Reflection;

namespace GarageManagement.Garage.WebAPI.Configuration.AutoMapper
{
    public class BooleanToStringResolver : IValueResolver<object, object, string>
    {
        public string Resolve(object source, object destination, string destinationMember, ResolutionContext context)
        {
            return (bool)source ? "Có" : "Không";
        }
    }

    public class NullOrEmptyStringResolver : IValueResolver<object, object, string>
    {
        private string destinationValue;

        public NullOrEmptyStringResolver(string destinationValue)
        {
            this.destinationValue = destinationValue;
        }

        public string Resolve(object source, object destination, string destinationMember, ResolutionContext context)
        {
            return source != null ? context.Options.Items[destinationValue].ToString() : string.Empty;
        }
    }

    public class NullOrZeroIntResolver : IValueResolver<object, object, int>
    {
        public int Resolve(object source, object destination, int destinationMember, ResolutionContext context)
        {
            return source != null ? (int)source : 0;
        }
    }
}
