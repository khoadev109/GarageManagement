using AutoMapper;

namespace GarageManagement.Garage.WebAPI.Configuration.AutoMapper
{
    public interface IValueResolver<in TSource, in TDestination, TDestMember>
    {
        TDestMember Resolve(TSource source, TDestination destination, TDestMember destinationMember, ResolutionContext context);
    }
}
