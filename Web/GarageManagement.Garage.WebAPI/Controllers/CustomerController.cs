using System;
using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Web.Http.ModelBinding;
using Common.Core.WebAPI.Result;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.Garage.WebAPI.ModelBinder;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class CustomerController : BaseController
    {
        public CustomerController(IBranchBusinessService branchService, ICustomerBusinessService customerService,
                                  ICustomerTypeBusinessService customerTypeService, ICustomerExchangeBusinessService customerExchangeService)
        {
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildCustomerService(customerService);
            serviceBuilder.BuildCustomerTypeService(customerTypeService);
            serviceBuilder.BuildCustomerExchangeService(customerExchangeService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterCustomersWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerService.GetCustomersWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> Get(string customerId = "")
        {
            var result = await CallAsyncWithRetry(() => dependency.CustomerService.GetCustomerByIdAsync(customerId));
            if (!result.HasErrors)
            {
                result.Target.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
                result.Target.CustomerTypes = await ExecuteServiceReturnDataResult(() => dependency.CustomerTypeService.GetAllAsync());

                // need to resolve this section
                var branchResult = await dependency.BranchService.GetByIdAsync(result.Target.BranchId);
                if (!branchResult.HasErrors)
                    result.Target.BranchName = branchResult.Target.Name;

                var customerTypeResult = await dependency.CustomerTypeService.GetByIdAsync(result.Target.CustomerTypeId);
                if (!customerTypeResult.HasErrors)
                    result.Target.CustomerTypeName = customerTypeResult.Target.Name;
                // end

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> GetCustomerWithCar(string customerId, bool includeExtraList = true)
        {
            var result = await CallAsyncWithRetry(() => dependency.CustomerExchangeService.GetCustomerWithOwnedCarAsync(customerId));
            if (!result.HasErrors)
            {
                if (includeExtraList)
                {
                    result.Target.Customer.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
                    result.Target.Customer.CustomerTypes = await ExecuteServiceReturnDataResult(() => dependency.CustomerTypeService.GetAllAsync());
                }

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }
            return Content(HttpStatusCode.InternalServerError, ErrorResult(result.Errors));
        }

        public async Task<IHttpActionResult> Post([FromBody] DTOCustomer customerDTO)
        {
            ApiResult errorResult = null;
            var customerCreatedResult = await dependency.CustomerService.CreateAsync(customerDTO);
            if (!customerCreatedResult.HasErrors)
            {
                var attachCustomerToCustomerExchangeResult = await dependency.CustomerExchangeService.AttachNewCustomerToCustomerExchangeAsync(customerCreatedResult.Target.Id);
                if (!attachCustomerToCustomerExchangeResult.HasErrors)
                {
                    customerCreatedResult.Target.CustomerExchangeId = attachCustomerToCustomerExchangeResult.Target.Id;
                    var successResult = SuccessResult(customerCreatedResult.Target);
                    return Ok(successResult);
                }
                else
                {
                    errorResult = ErrorResult(attachCustomerToCustomerExchangeResult.Errors);
                }
            }
            else
            {
                errorResult = ErrorResult(customerCreatedResult.Errors);
            }

            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> Put(string customerId, [FromBody] DTOCustomer customerDTO)
        {
            customerDTO.Id = customerId;
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerService.EditAsync(customerDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string customerId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerService.DeleteAsync(customerId), false);
        }

        [HttpGet]
        public async Task<IHttpActionResult> LookupCustomersWithPaging([ModelBinder] CustomerParameter searchCondition, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            var searchTerm = new List<Expression<Func<CustomerExchange, bool>>>();
            if (!string.IsNullOrEmpty(searchCondition.CustomerId))
                searchTerm.Add(x => x.CustomerId == searchCondition.CustomerId);

            if (!string.IsNullOrEmpty(searchCondition.CustomerName))
                searchTerm.Add(x => x.Customer.Name.Contains(searchCondition.CustomerName));

            if (!string.IsNullOrEmpty(searchCondition.CustomerPhone))
                searchTerm.Add(x => x.Customer.Phone == searchCondition.CustomerPhone);

            if (!string.IsNullOrEmpty(searchCondition.CarLicensePlates))
                searchTerm.Add(x => x.Car.LicensePlates == searchCondition.CarLicensePlates);

            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerService.GetCustomersLookupWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        [HttpGet]
        public async Task<IHttpActionResult> FetchFilterCustomersInTransactionWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerExchangeService.GetCustomersInTransactionWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        [HttpGet]
        public async Task<IHttpActionResult> AttachCustomerAndCarIntoQuotation(string customerId, bool includeOwnedcar = true)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerExchangeService.GetCustomerWithOwnedCarAsync(customerId));
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreateCustomerExchange([FromBody] DTOCustomerExchange customerExchangeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerExchangeService.CreateAsync(customerExchangeDTO), false);
        }

        [HttpPut]
        public async Task<IHttpActionResult> EditCustomerExchange(int customerExchangeId, [FromBody] DTOCustomerExchange customerExchangeDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CustomerExchangeService.EditAsync(customerExchangeDTO), false);
        }
    }
}
