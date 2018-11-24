using GarageManagement.ServiceInterface.Garage;

namespace GarageManagement.Garage.WebAPI.Builder.Service
{
    public interface IServiceBuilder
    {
        DependencyParameter Dependency { get; }

        void BuildAccessaryService(IAccessaryBusinessService accessaryService);

        void BuildAccessaryUnitService(IAccessaryUnitBusinessService accessaryUnitService);

        void BuildAuditTrailLogService(IAuditTrailBusinessService auditTrailLogService);

        void BuildBranchService(IBranchBusinessService branchService);

        void BuildCarService(ICarBusinessService carService);

        void BuildCategoryService(ICategoryBusinessService categoryService);

        void BuildCustomerService(ICustomerBusinessService customerService);

        void BuildCustomerExchangeService(ICustomerExchangeBusinessService customerExchangeService);

        void BuildCustomerTypeService(ICustomerTypeBusinessService customerTypeService);

        void BuildEmployeeService(IEmployeeBusinessService employeeService);

        void BuildGarageService(IGarageBusinessService garageService);

        void BuildManufacturerService(IManufacturerBusinessService manufacturerService);

        void BuildModelService(IModelBusinessService modelService);

        void BuildQuotationService(IQuotationBusinessService quotationService);

        void BuildRefreshTokenService(IRefreshTokenBusinessService refreshTokenService);

        void BuildPublicService(IServiceBusinessService publicService);

        void BuildServiceTypeService(IServiceTypeBusinessService serviceTypeService);

        void BuildServiceUnitService(IServiceUnitBusinessService serviceUnitService);

        void BuildStyleService(IStyleBusinessService styleService);

        void BuildUserService(IUserBusinessService userService);

        void BuildYearService(IYearBusinessService yearService);

        void BuildRoleService(IRoleBusinessService roleBusinessService);

        void BuildModuleService(IModuleBusinessService moduleBusinessService);

        void BuildRoleRightModuleService(IRoleRightModuleBusinessService roleRightModuleBusinessService);

        void BuildRightHandlerService(IRightHandlerBusinessService rightHandlerBusinessService);
    }
}
