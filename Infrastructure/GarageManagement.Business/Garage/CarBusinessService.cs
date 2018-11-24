using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using static Common.Core.Extension.AttributeExtensions;
using Common.Core.Extension;

namespace GarageManagement.Business.Garage
{
    public class CarBusinessService : ServiceBase<GarageDbContext>, ICarBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Car> carRepository;
        private readonly IRepository<GarageInfo> garageInfoRepository;
        private readonly IRepository<CustomerExchange> customerExchangeRepository;

        public CarBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            carRepository = _unitOfWork.GetRepository<Car>();
            garageInfoRepository = _unitOfWork.GetRepository<GarageInfo>();
            customerExchangeRepository = _unitOfWork.GetRepository<CustomerExchange>();
        }

        public Task<DataResult<DTOCar>> GetCarByIdAsync(string carId)
        {
            return Task.Run(() =>
            {
                var carDTO = new DTOCar();
                var carRepository = _unitOfWork.GetRepository<Car>();

                var car = _unitOfWork.GetRepository<Car>().GetById(carId);
                if (car != null)
                {
                    carDTO = _mapper.Map<DTOCar>(car);
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
                var carRepository = _unitOfWork.GetRepository<Car>();

                Expression<Func<CustomerExchange, object>>[] includes = { x => x.Car, x => x.Customer };

                var customerExchange = _unitOfWork.GetRepository<CustomerExchange>().Get(x => x.CustomerId == customerId &&
                                                                                              !x.Transferred.HasValue && !x.Transferred.Value &&
                                                                                              string.IsNullOrEmpty(x.TransfereeId) &&
                                                                                              string.IsNullOrEmpty(x.Transferee) &&
                                                                                              !x.TransferDate.HasValue).SingleOrDefault();
                var car = customerExchange.Car;
                if (car != null)
                {
                    carDTO = _mapper.Map<DTOCar>(car);
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

                var pagedCars = _unitOfWork.GetRepository<Car>().Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCar>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCar, Car>(_mapper, pagedCars)
                };

            }, cancellationToken);
        }

        public Task<DataResult<List<DTOCar>>> GetOwnedCarsOfSpecifyCustomerAsync(string customerId)
        {
            return Task.Run(() =>
            {
                var ownedCarDTOs = customerExchangeRepository.Get(filter: x => x.CustomerId == customerId && !string.IsNullOrEmpty(x.CarId),
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

                if (carRepository.ExistByCondition(x => x.LicensePlates == carDTO.LicensePlates && !string.IsNullOrEmpty(x.LicensePlates)))
                    return new DataResult<DTOCar> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Car License Plates") }, Target = carDTO };

                var carEntity = _mapper.Map<Car>(carDTO);
                carEntity.CreatedDate = DateTime.Now;

                string garageShortName = garageInfoRepository.GetFirstOrDefault()?.ShortName;
                var identityNumber = carRepository.Identity(x => x.GenerateId) != null ? carRepository.Identity(x => x.GenerateId).GenerateId : 0;

                carEntity.Id = garageShortName + IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Car.ToDefaultValue() }, NumberUnitType.Large);

                var createdCarEntity = carRepository.Insert(carEntity);
                _unitOfWork.SaveChanges();

                createdCarDTO = _mapper.Map<DTOCar>(createdCarEntity);

                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = createdCarDTO };
            });
        }

        public Task<DataResult<DTOCar>> EditAsync(DTOCar carDTO)
        {
            return Task.Run(() =>
            {
                var carRepository = _unitOfWork.GetRepository<Car>();

                if (carRepository.ExistByCondition(x => x.LicensePlates == carDTO.LicensePlates && x.Id != carDTO.Id))
                    return new DataResult<DTOCar> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Car License Plates") }, Target = carDTO };

                var carEntity = _mapper.Map<Car>(carDTO);

                carEntity.ModifiedDate = DateTime.Now;

                var updatedCarEntity = carRepository.Update(carEntity);
                _unitOfWork.SaveChanges();

                var updatedCarDTO = _mapper.Map<DTOCar>(updatedCarEntity);

                return new DataResult<DTOCar> { Errors = new List<ErrorDescriber>(), Target = updatedCarDTO };
            });
        }

        public Task<DataResult<bool>> DeleteAsync(string carId)
        {
            return Task.Run(() =>
            {
                if (!customerExchangeRepository.ExistByCondition(x => x.CarId == carId))
                {
                    carRepository.Delete(carId);
                    _unitOfWork.SaveChanges();

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
