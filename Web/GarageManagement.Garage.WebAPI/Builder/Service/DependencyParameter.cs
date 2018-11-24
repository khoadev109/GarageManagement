using GarageManagement.ServiceInterface.Garage;

namespace GarageManagement.Garage.WebAPI.Builder.Service
{
    public class DependencyParameter
    {
        public IAccessaryBusinessService AccessaryService { get; set; }

        public IAccessaryUnitBusinessService AccessaryUnitService { get; set; }

        public IAuditTrailBusinessService AuditTrailLogService { get; set; }

        public IBranchBusinessService BranchService { get; set; }

        public ICarBusinessService CarService { get; set; }

        public ICategoryBusinessService CategoryService { get; set; }

        public ICustomerBusinessService CustomerService { get; set; }

        public ICustomerExchangeBusinessService CustomerExchangeService { get; set; }

        public ICustomerTypeBusinessService CustomerTypeService { get; set; }

        public IEmployeeBusinessService EmployeeService { get; set; }

        public IGarageBusinessService GarageService { get; set; }

        public IManufacturerBusinessService ManufacturerService { get; set; }

        public IModelBusinessService ModelService { get; set; }

        public IQuotationBusinessService QuotationService { get; set; }

        public IRefreshTokenBusinessService RefreshTokenService { get; set; }

        public IServiceBusinessService PublicService { get; set; }

        public IServiceTypeBusinessService ServiceTypeService { get; set; }

        public IServiceUnitBusinessService ServiceUnitService { get; set; }

        public IStyleBusinessService StyleService { get; set; }

        public IUserBusinessService UserService { get; set; }

        public IYearBusinessService YearService { get; set; }

        public IRoleBusinessService RoleService { get; set; }

        public IModuleBusinessService ModuleService { get; set; }

        public IRoleRightModuleBusinessService RoleRightModuleService { get; set; }

        public IRightHandlerBusinessService RightHandlerBusinessService { get; set; }
    }
}
