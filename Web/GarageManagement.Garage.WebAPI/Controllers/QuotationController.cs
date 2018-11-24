using System;
using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Web.Http.ModelBinding;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.Garage.WebAPI.ModelBinder;
using GarageManagement.Garage.WebAPI.Attributes;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class QuotationController : BaseController
    {
        public QuotationController(IAccessaryBusinessService accessaryService, IAccessaryUnitBusinessService accessaryUnitService, IServiceBusinessService publicService,
                                   IServiceUnitBusinessService publicServiceUnit, IQuotationBusinessService quotationService, ICarBusinessService carService,
                                   ICustomerBusinessService customerService, ICustomerExchangeBusinessService customerExchangeService, IBranchBusinessService branchService,
                                   ICustomerTypeBusinessService customerTypeService)
        {
            serviceBuilder.BuildAccessaryService(accessaryService);
            serviceBuilder.BuildAccessaryUnitService(accessaryUnitService);
            serviceBuilder.BuildPublicService(publicService);
            serviceBuilder.BuildServiceUnitService(publicServiceUnit);
            serviceBuilder.BuildQuotationService(quotationService);
            serviceBuilder.BuildCarService(carService);
            serviceBuilder.BuildCustomerService(customerService);
            serviceBuilder.BuildCustomerExchangeService(customerExchangeService);
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildCustomerTypeService(customerTypeService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> Get(string quotationId = "", bool isLoadSelectList = false)
        {
            var result = await CallAsyncWithRetry(() => dependency.QuotationService.GetQuotationByIdAsync(quotationId));
            if (!result.HasErrors)
            {
                if (isLoadSelectList)
                {
                    var allBranches = await CallAsyncWithRetry(() => dependency.BranchService.GetAllAsync());
                    var allCustomerTypes = await CallAsyncWithRetry(() => dependency.CustomerTypeService.GetAllAsync());

                    result.Target.Branches = !allBranches.HasErrors ? allBranches.Target : new List<DTOBranch>();
                    result.Target.CustomerTypes = !allCustomerTypes.HasErrors ? allCustomerTypes.Target : new List<DTOCustomerType>();
                }

                result.Target.ContactName = GetClaimValueByType(x => x.Type == ClaimTypes.Surname);
                result.Target.ContactPhone = GetClaimValueByType(x => x.Type == ClaimTypes.MobilePhone);

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> GetNote(string quotationId, int statusId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetSpecifyNoteAsync(quotationId, statusId));
        }

        public async Task<IHttpActionResult> GetAllQuotationItemsOfSpecifyQuotation(string quotationId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetQuotationItemsByQuotationIdAsync(quotationId));
        }

        public async Task<IHttpActionResult> GetAllQuotationItemsWithParentCategoryOfSpecifyQuotation(string quotationId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetParentCategoriesWithItemsByQuotationIdAsync(quotationId));
        }

        public async Task<IHttpActionResult> GetAllQuotationItemsWithParentServiceTypeOfSpecifyQuotation(string quotationId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetParentServiceTypesWithItemsByQuotationIdAsync(quotationId));
        }

        public async Task<IHttpActionResult> GetAllQuotationInfoById(string quotationId)
        {
            var combineQuotationDTO = new DTOCombineQuotation();
            var errors = new List<ErrorDescriber>();

            var quotationResult = await CallAsyncWithRetry(() => dependency.QuotationService.GetQuotationByIdAsync(quotationId));
            if (quotationResult.HasErrors)
                errors.AddRange(quotationResult.Errors);

            var employeesResult = await CallAsyncWithRetry(() => dependency.QuotationService.GetEmployeesByQuotationIdAsync(quotationId));
            if (employeesResult.HasErrors)
                errors.AddRange(employeesResult.Errors);

            var itemsResult = await CallAsyncWithRetry(() => dependency.QuotationService.GetQuotationItemsByQuotationIdAsync(quotationId));
            if (itemsResult.HasErrors)
                errors.AddRange(itemsResult.Errors);

            if (errors.Count > 0)
            {
                var errorResult = ErrorResult(errors);
                return Content(HttpStatusCode.InternalServerError, errorResult);
            }

            combineQuotationDTO.Quotation = quotationResult.Target;
            combineQuotationDTO.Employees = employeesResult.Target;
            combineQuotationDTO.Items = itemsResult.Target;

            var successResult = SuccessResult(combineQuotationDTO);
            return Ok(successResult);
        }

        public async Task<IHttpActionResult> GetEmployeesByQuotation(string quotationId = "")
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetEmployeesByQuotationIdAsync(quotationId));
        }

        public async Task<IHttpActionResult> GetAllQuotationsBySearchTerm(string searchTerm = "")
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetAllQuotationsBySearchTermAsync(searchTerm));
        }

        public async Task<IHttpActionResult> GetPendingQuotations(int statusId = 0, string searchTerm = "")
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetPendingQuotationsAsync(statusId, searchTerm));
        }

        public async Task<IHttpActionResult> GetFilterQuotationItemsByQuotationWithPaging(string quotationId, string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetQuotationItemsWithPagingAsync(quotationId, searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        [HttpGet]
        public async Task<IHttpActionResult> LookupQuotationsWithPaging([ModelBinder] QuotationParameter searchCondition, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            var searchTerm = new List<Expression<Func<Quotation, bool>>>();
            if (!string.IsNullOrEmpty(searchCondition.QuotationId))
                searchTerm.Add(x => x.Id.Contains(searchCondition.QuotationId));

            searchTerm = FilterQuotationConditionByLookupType(searchTerm, searchCondition);

            var result = await CallAsyncWithRetry(() => dependency.QuotationService.GetQuotationsLookupWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
            if (!result.HasErrors)
            {
                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> GetFilterReceiptsWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetReceiptsWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetFilterPayslipsWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetPayslipsWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOCombineQuotation combineQuotation)
        {
            var customerExchangeResult = await dependency.CustomerExchangeService.GetCustomerExchangeByCustomerAndCarIdAsync(combineQuotation.CustomerId, combineQuotation.CarId);

            combineQuotation.Quotation.UserName = GetClaimValueByType(x => x.Type == ClaimTypes.Surname);
            combineQuotation.Quotation.CustomerExchangeId = !customerExchangeResult.HasErrors ? customerExchangeResult.Target.Id : 0;
            
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateQuotationAsync(combineQuotation.Quotation), false);
        }

        public async Task<IHttpActionResult> Put(string quotationId, [FromBody] DTOQuotation quotationDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.EditQuotationAsync(quotationDTO), false);
        }

        public async Task<IHttpActionResult> PutQuotationStatus(string quotationId, [FromBody]int quotationstatusId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.UpdateQuotationStatusAsync(quotationId, quotationstatusId), false);
        }

        [HttpGet]
        public async Task<IHttpActionResult> LookupCustomerAndOwnedCars()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerExchangeService.GetCustomerAndOwnedCarsAsync());
        }

        [HttpGet]
        public async Task<IHttpActionResult> InitializeNewQuotationItem()
        {
            var result = new DTOQuotationItem();
            var allAccessaries = await dependency.AccessaryService.GetAllAccessariesAsync();
            var allServices = await dependency.PublicService.GetAllServicesAsync();

            result.Accessaries = !allAccessaries.HasErrors ? allAccessaries.Target : new List<DTOAccessary>();
            result.Services = !allServices.HasErrors ? allServices.Target : new List<DTOService>();

            var successResult = SuccessResult(result);
            return Ok(successResult);
        }

        public async Task<IHttpActionResult> GetQuotationItem(int quotationItemId = 0, string quotationId = "")
        {
            var result = await CallAsyncWithRetry(() => dependency.QuotationService.GetQuotationItemByIdAsync(quotationItemId));
            if (!result.HasErrors)
            {
                var allAccessaries = await dependency.AccessaryService.GetAllAccessariesAsync();
                var allServices = await dependency.PublicService.GetAllServicesAsync();
                var allEmployeesInQuotation = await dependency.QuotationService.GetEmployeesByQuotationIdAsync(quotationId);

                result.Target.Accessaries = !allAccessaries.HasErrors ? allAccessaries.Target : new List<DTOAccessary>();
                result.Target.Services = !allServices.HasErrors ? allServices.Target : new List<DTOService>();
                result.Target.Employees = !allEmployeesInQuotation.HasErrors ? allEmployeesInQuotation.Target : new List<DTOEmployee>();

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> GetPaySlip(int id = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetPaySlipByIdAsync(id));
        }

        public async Task<IHttpActionResult> GetReceipt(int id = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetReceiptByIdAsync(id));
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreateQuotationItem([FromBody]DTOQuotationItem quotationItemDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateQuotationItemAsync(quotationItemDTO), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> EditQuotationItem(int quotationItemId, [FromBody]DTOQuotationItem quotationItemDTO)
        {
            quotationItemDTO.Id = quotationItemId;
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.EditQuotationItemAsync(quotationItemDTO), false);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> RemoveQuotationItem(int quotationItemId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.DeleteQuotationItemAsync(quotationItemId), false);
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreateListOfQuotationItems([FromBody] DTOQuotationAndItems quotationAndItemsDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateQuotationItemsAsync(quotationAndItemsDTO.QuotationId, quotationAndItemsDTO.Items), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> UpdateQuotationEmployees(string quotationId, [FromBody]List<string> employeeIds)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateOrUpdateEmployeesForQuotationAsync(quotationId, employeeIds), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> UpdateQuotationItems(string quotationId, [FromBody]List<DTOQuotationItem> quotationItems)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateOrUpdateItemsForQuotationAsync(quotationId, quotationItems), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> CreateOrUpdateReceipts(int receiptsBillId, [FromBody]DTOReceiptsBill receiptsBillDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateOrUpdateReceiptsBillAsync(receiptsBillDTO), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> CreateOrUpdatePaySlip(int paySlipBillId, [FromBody]DTOPaySlipBill paySlipBillDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateOrUpdatePaySlipBillAsync(paySlipBillDTO), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> UpdateNoteForSpecifyStep(int noteId, [FromBody]DTOQuotationNote noteDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.CreateOrUpdateNoteForSpecifyStepAsync(noteId, noteDTO), false);
        }

        public async Task<IHttpActionResult> GetPrintTemplateByStatus(int statusId = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.GetPrintTemplateByStatusIdAsync(statusId));
        }

        public async Task<IHttpActionResult> AddOrUpdatePrintTemplate(DTOPrintTemplate printTemplateDto)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.QuotationService.SavePrintTemplateAsync(printTemplateDto), false);
        }

        private async Task<List<ErrorDescriber>> CreateOrUpdateCar(DTOCar carDTO)
        {
            var errorResult = new List<ErrorDescriber>();

            if (!string.IsNullOrEmpty(carDTO.Id))
            {
                var carResult = await dependency.CarService.EditAsync(carDTO);
                if (carResult.HasErrors)
                    errorResult = carResult.Errors;
            }
            else
            {
                if (!string.IsNullOrEmpty(carDTO.VinNumber) && 
                    !string.IsNullOrEmpty(carDTO.MachineNumber) && 
                    !string.IsNullOrEmpty(carDTO.LicensePlates))
                {
                    var carResult = await dependency.CarService.CreateAsync(carDTO);
                    if (carResult.HasErrors)
                        errorResult = carResult.Errors;
                }
            }

            return errorResult;
        }

        private async Task<IHttpActionResult> SaveQuotationAndItems(DTOQuotation quotationDTO, List<DTOQuotationItem> quotationItemsDTO, string branchId, int customerExchangeId)
        {
            quotationDTO.BranchId = branchId;
            quotationDTO.CustomerExchangeId = customerExchangeId;

            var quotationResult = await dependency.QuotationService.CreateQuotationAsync(quotationDTO);
            if (quotationResult.HasErrors)
            {
                var errorResult = ErrorResult(quotationResult.Errors);
                return Ok(errorResult);
            }

            var quotationItemResult = await dependency.QuotationService.CreateQuotationItemsAsync(quotationResult.Target.Id, quotationItemsDTO);
            if (quotationItemResult.HasErrors)
            {
                var errorResult = ErrorResult(quotationItemResult.Errors);
                return Ok(errorResult);
            }

            var successResult = SuccessResult(true);
            return Ok(successResult);
        }

        private List<Expression<Func<Quotation, bool>>> FilterQuotationConditionByLookupType(List<Expression<Func<Quotation, bool>>> searchTerm, QuotationParameter searchCondition)
        {
            int doneStatusId = (int)DTOQuotationStatusName.Done;

            if (!string.IsNullOrEmpty(searchCondition.LookupType) && searchCondition.LookupType != "MaitainingService")
            {
                if (searchCondition.LookupType == "TransactionHistory")
                {
                    searchTerm.Add(x => x.StatusId == doneStatusId);
                }
                else if (searchCondition.LookupType == "MaintenanceExpire")
                {
                    var lastSevenMaintenanceDays = DateTime.Now.AddDays(7);
                    searchTerm.Add(x => x.NextMaintenanceDate.Value <= lastSevenMaintenanceDays && 
                                        x.StatusId == doneStatusId);
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(searchCondition.QuotationStatusId))
                {
                    int statusId = int.Parse(searchCondition.QuotationStatusId);
                    searchTerm.Add(x => x.StatusId == statusId);
                }
                if (!string.IsNullOrEmpty(searchCondition.QuotationEntryDate))
                {
                    var entryDate = DateTime.Parse(searchCondition.QuotationEntryDate);
                    searchTerm.Add(x => x.StartDate == entryDate);
                }
                searchTerm.Add(x => x.StatusId != doneStatusId);
            }

            if (!string.IsNullOrEmpty(searchCondition.CustomerId))
                searchTerm.Add(x => x.CustomerExchange.CustomerId.Contains(searchCondition.CustomerId));

            return searchTerm;
        }
    }
}
