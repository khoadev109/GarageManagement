using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class CarController : BaseController
    {
        public CarController(IBranchBusinessService branchService, ICarBusinessService carService, IManufacturerBusinessService manufacturerService,
                             IStyleBusinessService styleService, IModelBusinessService modelService, IYearBusinessService yearService,
                             ICustomerExchangeBusinessService customerExchangeService)
        {
            serviceBuilder.BuildBranchService(branchService);
            serviceBuilder.BuildCarService(carService);
            serviceBuilder.BuildManufacturerService(manufacturerService);
            serviceBuilder.BuildStyleService(styleService);
            serviceBuilder.BuildModelService(modelService);
            serviceBuilder.BuildYearService(yearService);
            serviceBuilder.BuildStyleService(styleService);
            serviceBuilder.BuildCustomerExchangeService(customerExchangeService);

            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterCarsWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CarService.GetCarsWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetCarByCustomerId(string customerId = "")
        {
            if (customerId == "")
                return Ok(SuccessResult(new DTOCar()));

            var result = await CallAsyncWithRetry(() => dependency.CarService.GetSpecifyCarByCustomerIdAsync(customerId));
            if (!result.HasErrors)
            {
                result.Target.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
                result.Target.Manufacturers = await ExecuteServiceReturnDataResult(() => dependency.ManufacturerService.GetAllAsync());

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> GetOwnedCarsByCustomerId(string customerId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CarService.GetOwnedCarsOfSpecifyCustomerAsync(customerId));
        }

        public async Task<IHttpActionResult> Get(string carId = "")
        {
            var result = await CallAsyncWithRetry(() => dependency.CarService.GetCarByIdAsync(carId));
            if (!result.HasErrors)
            {
                result.Target.Branches = await ExecuteServiceReturnDataResult(() => dependency.BranchService.GetAllAsync());
                result.Target.Manufacturers = await ExecuteServiceReturnDataResult(() => dependency.ManufacturerService.GetAllAsync());

                var successResult = SuccessResult(result.Target);
                return Ok(successResult);
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOCarWithOwner carDTO)
        {
            var carResult = await dependency.CarService.CreateAsync(carDTO.Car);
            if (carResult.HasErrors)
                return Content(HttpStatusCode.InternalServerError, ErrorResult(carResult.Errors));

            var carOwnerResult = await dependency.CustomerExchangeService.CreateCarOwnerAsync(carResult.Target?.Id, carDTO.Car.CurrentCarOwnerId);
            if (carOwnerResult.HasErrors)
                return Content(HttpStatusCode.InternalServerError, ErrorResult(carOwnerResult.Errors));

            var successResult = SuccessResult(carOwnerResult.Target);
            return Ok(successResult);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOCar carDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CarService.EditAsync(carDTO), false);
        }

        public async Task<IHttpActionResult> Delete(string carId, string customerId = "")
        {
            var result = await dependency.CarService.DeleteAsync(carId);
            if (!result.HasErrors)
            {
                if (customerId != "")
                {
                    var deleteResult = await dependency.CustomerExchangeService.DeleteAsync(carId, customerId);
                    if (!deleteResult.HasErrors)
                    {
                        var successResult = SuccessResult(result.Target);
                        return Ok(successResult);
                    }
                    else
                    {
                        var errorDeleteResult = ErrorResult(result.Errors);
                        return Content(HttpStatusCode.InternalServerError, errorDeleteResult);
                    }
                }
                else
                {
                    var successResult = SuccessResult(result.Target);
                    return Ok(successResult);
                }
            }

            var errorResult = ErrorResult(result.Errors);
            return Content(HttpStatusCode.InternalServerError, errorResult);
        }
    }
}
