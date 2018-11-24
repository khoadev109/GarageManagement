using AutoMapper;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.Interface.Garage.DTO;

namespace GarageManagement.Infrastructure.AutoMapper
{
    public class CustomerProfile : Profile         
    {
        public CustomerProfile()
        {
            CreateMap<Customer, DTOCustomer>().ReverseMap();
        }
    }        
}
