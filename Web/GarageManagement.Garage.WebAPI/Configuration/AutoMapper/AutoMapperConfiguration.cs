using System;
using AutoMapper;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Garage.WebAPI.Configuration.AutoMapper
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            UserMap();
            GarageMap();
            BranchMap();
            AsscessaryMap();
            CategoryMap();
            ServiceMap();
            QuotationMap();
            QuotationItemMap();
            CustomerMap();
            CarMap();
            EmployeeMap();
            BillMap();
            RoleRightModule();
        }

        private void UserMap()
        {
            CreateMap<User, DTOUser>();
        }
        
        private void GarageMap()
        {
            CreateMap<DTOGarage, GarageInfo>()
                .ForMember(dest => dest.ExpireDate,
                            opt => opt.MapFrom(src => DateTime.Parse(src.ExpireDate)))
                .ReverseMap()
                .ForMember(dest => dest.SmsPhoneNumber, opt => opt.Ignore())
                .ForMember(dest => dest.EmailSchedule, opt => opt.Ignore());

            CreateMap<DTOGarage, GarageSetting>().ReverseMap();
        }

        private void BranchMap()
        {
            CreateMap<Branch, DTOBranch>().ReverseMap();
        }

        private void CategoryMap()
        {
            CreateMap<Category, DTOCategory>()
                .ForMember(dest => dest.ParentId, opt => opt.MapFrom(src => src.Parent != null ? src.Parent.Id : 0))
                .ForMember(dest => dest.ParentName, opt => opt.MapFrom(src => src.Parent != null ? src.Parent.Name : string.Empty))
                .ReverseMap()
                .ForMember(dest => dest.Parent, opt => opt.Ignore());
        }

        private void AsscessaryMap()
        {
            CreateMap<Accessary, DTOAccessary>()
                            .ForMember(dest => dest.UnitId, opt => opt.MapFrom(src => src.UnitId))
                            .ForMember(dest => dest.UnitName, opt => opt.MapFrom(src => src.Unit != null ? src.Unit.Name : string.Empty))
                            .ForMember(dest => dest.Branches, opt => opt.Ignore())
                            .ForMember(dest => dest.Categories, opt => opt.Ignore())
                            .ForMember(dest => dest.Units, opt => opt.Ignore())
                            .ReverseMap()
                            .ForMember(dest => dest.Branch, opt => opt.Ignore())
                            .ForMember(dest => dest.Category, opt => opt.Ignore())
                            .ForMember(dest => dest.Unit, opt => opt.Ignore());
            CreateMap<AccessaryUnit, DTOAccessaryUnit>();
        }

        private void ServiceMap()
        {
            CreateMap<ServiceType, DTOServiceType>()
                .ForMember(dest => dest.ParentId, opt => opt.MapFrom(src => src.Parent != null ? src.Parent.Id : 0))
                .ForMember(dest => dest.ParentName, opt => opt.MapFrom(src => src.Parent != null ? src.Parent.Name : string.Empty))
                .ReverseMap()
                .ForMember(dest => dest.Parent, opt => opt.Ignore());
            CreateMap<Service, DTOService>()
                .ForMember(dest => dest.UnitId, opt => opt.MapFrom(src => src.UnitId))
                .ForMember(dest => dest.UnitName, opt => opt.MapFrom(src => src.Unit != null ? src.Unit.Name : string.Empty))
                .ForMember(dest => dest.Branches, opt => opt.Ignore())
                .ForMember(dest => dest.ServiceTypes, opt => opt.Ignore())
                .ForMember(dest => dest.Units, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Branch, opt => opt.Ignore())
                .ForMember(dest => dest.ServiceType, opt => opt.Ignore())
                .ForMember(dest => dest.Unit, opt => opt.Ignore());
            CreateMap<ServiceUnit, DTOServiceUnit>();
        }

        private void CustomerMap()
        {
            CreateMap<CustomerType, DTOCustomerType>();
            CreateMap<Customer, DTOCustomer>()
                .ForMember(dest => dest.CustomerTypeName, opt => opt.MapFrom(src => src.CustomerType != null ? src.CustomerType.Name : string.Empty))
                .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch != null ? src.Branch.Name : string.Empty))
                .ForMember(dest => dest.Branches, opt => opt.Ignore())
                .ForMember(dest => dest.CustomerTypes, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Branch, opt => opt.Ignore())
                .ForMember(dest => dest.CustomerType, opt => opt.Ignore());
            CreateMap<CustomerExchange, DTOCustomerExchange>()
               .ForMember(dest => dest.Quotations, opt => opt.Ignore())
               .ReverseMap()
               .ForMember(dest => dest.Car, opt => opt.Ignore())
               .ForMember(dest => dest.Customer, opt => opt.Ignore())
               .ForMember(dest => dest.Quotations, opt => opt.Ignore());
        }

        private void BillMap()
        {
            CreateMap<ReceiptsBill, DTOReceiptsBill>()
                .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate.GetValueOrDefault().Year > 1900 ? src.CreateDate.GetValueOrDefault().ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => src.ModifiedDate.Year > 1900 ? src.ModifiedDate.ToString("dd/MM/yyyy") : ""))
                .ReverseMap()
                .ForMember(dest => dest.Quotation, opt => opt.Ignore());

            CreateMap<PaySlipBill, DTOPaySlipBill>()
                .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate.GetValueOrDefault().Year > 1900 ? src.CreateDate.GetValueOrDefault().ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => src.ModifiedDate.Year > 1900 ? src.ModifiedDate.ToString("dd/MM/yyyy") : ""))
                .ReverseMap()
                .ForMember(dest => dest.Quotation, opt => opt.Ignore());
        }

        private void CarMap()
        {
            CreateMap<Car, DTOCar>()
                .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch != null ? src.Branch.Name : string.Empty))
                .ReverseMap()
                .ForMember(dest => dest.Branch, opt => opt.Ignore())
                .ForMember(dest => dest.Manufacturer, opt => opt.Ignore())
                .ForMember(dest => dest.Style, opt => opt.Ignore())
                .ForMember(dest => dest.Model, opt => opt.Ignore())
                .ForMember(dest => dest.Year, opt => opt.Ignore());

            CreateMap<Manufacturer, DTOManufacturer>();
            CreateMap<Style, DTOStyle>();
            CreateMap<Model, DTOModel>()
                .ForMember(dest => dest.StyleId, opt => opt.MapFrom(src => src.StyleId))
                .ForMember(dest => dest.StyleName, opt => opt.MapFrom(src => src.Style != null ? src.Style.Name : string.Empty))
                .ForMember(dest => dest.Styles, opt => opt.Ignore())
                .ForMember(dest => dest.Manufacturers, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Style, opt => opt.Ignore())
                .ForMember(dest => dest.Manufacturer, opt => opt.Ignore());

            CreateMap<Year, DTOYear>()
                .ForMember(dest => dest.Models, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Model, opt => opt.Ignore());
        }

        private void EmployeeMap()
        {
            CreateMap<RefreshToken, DTORefreshToken>().ReverseMap();

            CreateMap<Employee, DTOEmployee>()
                .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch != null ? src.Branch.Name : string.Empty))
                .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.Birthday.GetValueOrDefault().Year > 1900 ? src.Birthday.GetValueOrDefault().ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.Branches, opt => opt.Ignore())
                .ForMember(dest => dest.Users, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Branch, opt => opt.Ignore());
        }

        private void QuotationMap()
        {
            CreateMap<Quotation, DTOQuotation>()
                .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerExchange != null ? src.CustomerExchange.CustomerId : string.Empty))
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.CustomerExchange != null && src.CustomerExchange.Customer != null
                                                                                ? src.CustomerExchange.Customer.Name : string.Empty))
                .ForMember(dest => dest.BranchId, opt => opt.MapFrom(src => src.BranchId))
                .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch != null ? src.Branch.Name : string.Empty))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status != null ? src.Status.Name : string.Empty))
                .ForMember(dest => dest.AdviserId, opt => opt.MapFrom(src => src.AdviserId))
                .ForMember(dest => dest.AdviserName, opt => opt.MapFrom(src => src.Adviser != null ? src.Adviser.Name : string.Empty))
                .ForMember(dest => dest.EntryDate, opt => opt.MapFrom(src => src.EntryDate.ToString("dd/MM/yyyy")))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToString("dd/MM/yyyy")))
                .ForMember(dest => dest.ExpectedCompleteDate, opt => opt.MapFrom(src => src.ExpectedCompleteDate.Year > 1900 ? src.ExpectedCompleteDate.ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.CompleteDate, opt => opt.MapFrom(src => src.CompleteDate.GetValueOrDefault().Year > 1900 ? src.CompleteDate.GetValueOrDefault().ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.NextMaintenanceDate, opt => opt.MapFrom(src => src.NextMaintenanceDate.GetValueOrDefault().Year > 1900 ? src.NextMaintenanceDate.GetValueOrDefault().ToString("dd/MM/yyyy") : ""))
                .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src.CustomerExchange.Car))
                .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.CustomerExchange.Customer))
                .ReverseMap()
                .ForMember(dest => dest.Branch, opt => opt.Ignore())
                .ForMember(dest => dest.CustomerExchange, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.Adviser, opt => opt.Ignore())
                .ForMember(dest => dest.Items, opt => opt.Ignore());
            CreateMap<QuotationNote, DTOQuotationNote>()
               .ReverseMap()
               .ForMember(dest => dest.Quotation, opt => opt.Ignore())
               .ForMember(dest => dest.Status, opt => opt.Ignore());

            CreateMap<QuotationStatus, DTOQuotationStatus>().ReverseMap();
        }

        private void QuotationItemMap()
        {
            CreateMap<QuotationItem, DTOQuotationItem>()
                .ForMember(dest => dest.AccessaryId, opt => opt.MapFrom(src => src.AccessaryId))
                .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.ServiceId))
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.AccessaryName, opt => opt.MapFrom(src => src.Accessary != null ? src.Accessary.Name : string.Empty))
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Service != null ? src.Service.Name : string.Empty))
                .ForMember(dest => dest.EmployeeName, opt => opt.MapFrom(src => src.Employee != null ? src.Employee.Name : string.Empty))
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.Accessary != null ? src.Accessary.Price : (src.Service != null ? src.Service.Cost : 0)))
                .ForMember(dest => dest.UnitId, opt => opt.MapFrom(src => src.Accessary != null ? src.Accessary.UnitId : (src.Service != null ? src.Service.UnitId : 0)))
                .ForMember(dest => dest.UnitName, opt => opt.MapFrom(src => src.Accessary != null ? src.Accessary.Unit.Name : (src.Service != null ? src.Service.Unit.Name : string.Empty)))
                .ReverseMap()
                .ForMember(dest => dest.Quotation, opt => opt.Ignore())
                .ForMember(dest => dest.Service, opt => opt.Ignore())
                .ForMember(dest => dest.Accessary, opt => opt.Ignore())
                .ForMember(dest => dest.Employee, opt => opt.Ignore());

            CreateMap<PrintTemplate, DTOPrintTemplate>().ReverseMap();
        }

        private void RoleRightModule()
        {
            CreateMap<Role, DTORole>();
            CreateMap<Right, DTORight>();
            CreateMap<Module, DTOModule>();
            CreateMap<RoleRightModule, DTORoleRightModule>();
        }
    }
}
