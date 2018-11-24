using GarageManagement.ServiceInterface.Garage;

namespace GarageManagement.Garage.WebAPI.Builder.Service
{
    public class ServiceBuilder : IServiceBuilder
    {
        private readonly DependencyParameter _dependencyParameter;

        public DependencyParameter Dependency => _dependencyParameter;

        public ServiceBuilder()
        {
            _dependencyParameter = new DependencyParameter();
        }

        public void BuildAccessaryService(IAccessaryBusinessService accessaryService)
        {
            _dependencyParameter.AccessaryService = accessaryService;
        }

        public void BuildAccessaryUnitService(IAccessaryUnitBusinessService accessaryUnitService)
        {
            _dependencyParameter.AccessaryUnitService = accessaryUnitService;
        }

        public void BuildAuditTrailLogService(IAuditTrailBusinessService auditTrailLogService)
        {
            _dependencyParameter.AuditTrailLogService = auditTrailLogService;
        }

        public void BuildBranchService(IBranchBusinessService branchService)
        {
            _dependencyParameter.BranchService = branchService;
        }

        public void BuildCarService(ICarBusinessService carService)
        {
            _dependencyParameter.CarService = carService;
        }

        public void BuildCategoryService(ICategoryBusinessService categoryService)
        {
            _dependencyParameter.CategoryService = categoryService;
        }

        public void BuildCustomerExchangeService(ICustomerExchangeBusinessService customerExchangeService)
        {
            _dependencyParameter.CustomerExchangeService = customerExchangeService;
        }

        public void BuildCustomerService(ICustomerBusinessService customerService)
        {
            _dependencyParameter.CustomerService = customerService;
        }

        public void BuildCustomerTypeService(ICustomerTypeBusinessService customerTypeService)
        {
            _dependencyParameter.CustomerTypeService = customerTypeService;
        }

        public void BuildEmployeeService(IEmployeeBusinessService employeeService)
        {
            _dependencyParameter.EmployeeService = employeeService;
        }

        public void BuildGarageService(IGarageBusinessService garageService)
        {
            _dependencyParameter.GarageService = garageService;
        }

        public void BuildManufacturerService(IManufacturerBusinessService manufacturerService)
        {
            _dependencyParameter.ManufacturerService = manufacturerService;
        }

        public void BuildModelService(IModelBusinessService modelService)
        {
            _dependencyParameter.ModelService = modelService;
        }

        public void BuildPublicService(IServiceBusinessService publicService)
        {
            _dependencyParameter.PublicService = publicService;
        }

        public void BuildQuotationService(IQuotationBusinessService quotationService)
        {
            _dependencyParameter.QuotationService = quotationService;
        }

        public void BuildRefreshTokenService(IRefreshTokenBusinessService refreshTokenService)
        {
            _dependencyParameter.RefreshTokenService = refreshTokenService;
        }

        public void BuildServiceTypeService(IServiceTypeBusinessService serviceTypeService)
        {
            _dependencyParameter.ServiceTypeService = serviceTypeService;
        }

        public void BuildServiceUnitService(IServiceUnitBusinessService serviceUnitService)
        {
            _dependencyParameter.ServiceUnitService = serviceUnitService;
        }

        public void BuildStyleService(IStyleBusinessService styleService)
        {
            _dependencyParameter.StyleService = styleService;
        }

        public void BuildUserService(IUserBusinessService userService)
        {
            _dependencyParameter.UserService = userService;
        }

        public void BuildYearService(IYearBusinessService yearService)
        {
            _dependencyParameter.YearService = yearService;
        }

        public void BuildRoleService(IRoleBusinessService roleService)
        {
            _dependencyParameter.RoleService = roleService;
        }

        public void BuildModuleService(IModuleBusinessService moduleService)
        {
            _dependencyParameter.ModuleService = moduleService;
        }

        public void BuildRoleRightModuleService(IRoleRightModuleBusinessService roleRightModuleService)
        {
            _dependencyParameter.RoleRightModuleService = roleRightModuleService;
        }

        public void BuildRightHandlerService(IRightHandlerBusinessService rightHandlerBusinessService)
        {
            _dependencyParameter.RightHandlerBusinessService = rightHandlerBusinessService;
        }
    }
}
