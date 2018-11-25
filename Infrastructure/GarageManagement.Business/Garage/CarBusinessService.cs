using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.ServiceInterface;
using Common.Core.Extension;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using static Common.Core.Extension.AttributeExtensions;

namespace GarageManagement.Business.Garage
{
    public class CarBusinessService : ServiceBase<GarageDbContext>, ICarBusinessService
    {
        private readonly IRepository<Car> _carRepository;
        private readonly IRepository<GarageInfo> _garageInfoRepository;
        private readonly IRepository<CustomerExchange> _customerExchangeRepository;

        public CarBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _carRepository = base.unitOfWork.GetRepository<Car>();
            _garageInfoRepository = base.unitOfWork.GetRepository<GarageInfo>();
            _customerExchangeRepository = base.unitOfWork.GetRepository<CustomerExchange>();
        }

        public Task<DataResult<DTOCar>> GetCarByIdAsync(string carId)
        {
            return Task.Run(() =>
            {
                var carDTO = new DTOCar();
                var carRepository = unitOfWork.GetRepository<Car>();

                var car = unitOfWork.GetRepository<Car>().GetById(carId);
                if (car != null)
                {
                    carDTO = mapper.Map<DTOCar>(car);
                }
                else
                {
                    var identityNumber = carRepository.Identity(x => x.GenerateId) != null ? carRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    carDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Car.ToDefaultValue() }, NumberUnitType.Large);
                }

                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = carDTO };
            });
        }

        public Task<DataResult<DTOCar>> GetSpecifyCarByCustomerIdAsync(string customerId)
        {
            return Task.Run(() =>
            {
                var carDTO = new DTOCar();
                var carRepository = unitOfWork.GetRepository<Car>();

                Expression<Func<CustomerExchange, object>>[] includes = { x => x.Car, x => x.Customer };

                var customerExchange = unitOfWork.GetRepository<CustomerExchange>().Get(x => x.CustomerId == customerId &&
                                                                                              !x.Transferred.HasValue && !x.Transferred.Value &&
                                                                                              string.IsNullOrEmpty(x.TransfereeId) &&
                                                                                              string.IsNullOrEmpty(x.Transferee) &&
                                                                                              !x.TransferDate.HasValue).SingleOrDefault();
                var car = customerExchange.Car;
                if (car != null)
                {
                    carDTO = mapper.Map<DTOCar>(car);
                }
                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = carDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCar>>> GetCarsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Car>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Branch,Manufacturer,Style,Model,Year";

                var sort = new FieldSortCriteria<Car>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.ManufacturerName.Contains(searchTerm) ||
                                               x.ModelName.Contains(searchTerm) ||
                                               x.YearName.Contains(searchTerm));

                var pagedCars = unitOfWork.GetRepository<Car>().Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCar>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCar, Car>(mapper, pagedCars)
                };

            }, cancellationToken);
        }

        public Task<DataResult<List<DTOCar>>> GetOwnedCarsOfSpecifyCustomerAsync(string customerId)
        {
            return Task.Run(() =>
            {
                var ownedCarDTOs = _customerExchangeRepository.Get(filter: x => x.CustomerId == customerId && !string.IsNullOrEmpty(x.CarId),
                                                                  orderBy: x => x.OrderByDescending(o => o.Car.CreatedDate),
                                                                  includes: new Expression<Func<CustomerExchange, object>>[] { x => x.Car, x => x.Customer })
                                                          .Select(x => new DTOCar
                                                          {
                                                              Id = x.Car?.Id,
                                                              YearName = x.Car?.YearName,
                                                              ModelName = x.Car?.ModelName,
                                                              ManufacturerName = x.Car?.ManufacturerName,
                                                              LicensePlates = x.Car?.LicensePlates
                                                          }).ToList();

                return new DataResult<List<DTOCar>> { Errors = new List<ErrorDescriber>(), Target = ownedCarDTOs };
            });
        }

        public Task<DataResult<DTOCar>> CreateAsync(DTOCar carDTO)
        {
            return Task.Run(() =>
            {
                var createdCarDTO = new DTOCar();
                var passingCarOwnerId = carDTO.CurrentCarOwnerId;

                if (_carRepository.ExistByCondition(x => x.LicensePlates == carDTO.LicensePlates && !string.IsNullOrEmpty(x.LicensePlates)))
                    return new DataResult<DTOCar> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Car License Plates") }, Target = carDTO };

                var carEntity = mapper.Map<Car>(carDTO);
                carEntity.CreatedDate = DateTime.Now;

                string garageShortName = _garageInfoRepository.GetFirstOrDefault()?.ShortName;
                var identityNumber = _carRepository.Identity(x => x.GenerateId) != null ? _carRepository.Identity(x => x.GenerateId).GenerateId : 0;

                carEntity.Id = garageShortName + IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Car.ToDefaultValue() }, NumberUnitType.Large);

                var createdCarEntity = _carRepository.Insert(carEntity);
                unitOfWork.SaveChanges();

                createdCarDTO = mapper.Map<DTOCar>(createdCarEntity);

                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = createdCarDTO };
            });
        }

        public Task<DataResult<DTOCar>> EditAsync(DTOCar carDTO)
        {
            return Task.Run(() =>
            {
                var carRepository = unitOfWork.GetRepository<Car>();

                if (carRepository.ExistByCondition(x => x.LicensePlates == carDTO.LicensePlates && x.Id != carDTO.Id))
                    return new DataResult<DTOCar> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Car License Plates") }, Target = carDTO };

                var carEntity = mapper.Map<Car>(carDTO);

                carEntity.ModifiedDate = DateTime.Now;

                var updatedCarEntity = carRepository.Update(carEntity);
                unitOfWork.SaveChanges();

                var updatedCarDTO = mapper.Map<DTOCar>(updatedCarEntity);

                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = updatedCarDTO };
            });
        }

        public Task<DataResult<bool>> DeleteAsync(string carId)
        {
            return Task.Run(() =>
            {
                if (!_customerExchangeRepository.ExistByCondition(x => x.CarId == carId))
                {
                    _carRepository.Delete(carId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "xe");

                    return new DataResult<bool>
                    {
                        Target = false,
                        Errors = new List<ErrorDescriber> { new ErrorDescriber(dependentErrorMessage) }
                    };
                }
            });
        }
    }
}
