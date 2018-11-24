using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.Business.Garage
{
    public class CustomerExchangeBusinessService : ServiceBase<GarageDbContext>, ICustomerExchangeBusinessService
    {
        private readonly IRepository<CustomerExchange> customerExchangeRepository;

        public IMapper _mapper;

        public CustomerExchangeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            customerExchangeRepository = _unitOfWork.GetRepository<CustomerExchange>();
        }

        public Task<DataResult<DTOCustomerExchange>> GetCustomerExchangeByCustomerAndCarIdAsync(string customerId, string carId)
        {
            return Task.Run(() => {
                var customerExchange = customerExchangeRepository.GetFirstOrDefault(x => x.CustomerId == customerId && (string.IsNullOrEmpty(carId) || x.CarId == carId), 
                                                    includes: new Expression<Func<CustomerExchange, object>>[]{ x => x.Customer, x => x.Car });

                var customerExchangeDTO = customerExchange != null ? _mapper.Map<DTOCustomerExchange>(customerExchange) : new DTOCustomerExchange();

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = customerExchangeDTO };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> GetCustomerWithOwnedCarAsync(string customerId)
        {
            return Task.Run(() => {
                var customerExchangeDTO = new DTOCustomerExchange();

                Expression<Func<CustomerExchange, object>>[] includes =
                {
                    x => x.Car,
                    x => x.Customer,
                    x => x.Customer.Branch,
                    x => x.Customer.CustomerType
                };
                var customerExchange = customerExchangeRepository.GetFirstOrDefault(x => x.CustomerId == customerId && !string.IsNullOrEmpty(x.CarId), includes: includes);
                if (customerExchange != null)
                    customerExchangeDTO = _mapper.Map<DTOCustomerExchange>(customerExchange);

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = customerExchangeDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCustomerExchange>>> GetCustomersInTransactionWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                                          CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<CustomerExchange>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Customer,Car";

                var sort = new FieldSortCriteria<CustomerExchange>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Customer.Name.Contains(searchTerm) || x.Customer.Address.Contains(searchTerm));

                var pagedCustomerExchange = _unitOfWork.GetRepository<CustomerExchange>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOCustomerExchange>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCustomerExchange, CustomerExchange>(_mapper, pagedCustomerExchange)
                };

            }, cancellationToken);
        }

        public Task<DataResult<List<DTOCustomerExchange>>> GetCustomerAndOwnedCarsAsync()
        {
            return Task.Run(() => {
                var customerExchangeDTOs = new List<DTOCustomerExchange>();

                var groupCustomerExchange = customerExchangeRepository.Query().GroupBy(g => g.CustomerId)
                                                                      .Select(y => new { CustomerId = y.Key, Count = y.Count() });

                var customerExchange = customerExchangeRepository.Query().Join(groupCustomerExchange,
                                                                       current => current.CustomerId,
                                                                       group => group.CustomerId,
                                                                       (current, group) => new { All = current, Group = group })
                                                                 .Where(x => x.Group.Count - 1 == 0 || 
                                                                            (x.Group.Count - 1> 0 && x.All.CarId != null))
                                                                 .OrderBy(obc => obc.All.CustomerId)
                                                                 .Select(x => x.All)
                                                                 .Include(x => x.Car)
                                                                 .Include(x => x.Customer)
                                                                 .Include(x => x.Customer.Branch)
                                                                 .Include(x => x.Customer.CustomerType)
                                                                 .ToList();

                if (customerExchange.Count > 0)
                    customerExchangeDTOs = _mapper.Map<List<DTOCustomerExchange>>(customerExchange);
                
                return new DataResult<List<DTOCustomerExchange>> { Errors = new List<ErrorDescriber>(), Target = customerExchangeDTOs };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> CreateAsync(DTOCustomerExchange customerDTO)
        {
            return Task.Run(() => {
                var createdCustomerExhangeDTO = new DTOCustomerExchange();
                var customerExchangeEntity = _mapper.Map<CustomerExchange>(createdCustomerExhangeDTO);

                if (!customerExchangeRepository.ExistByCondition(x => ((x.CustomerId == customerExchangeEntity.CustomerId && x.CarId == customerExchangeEntity.CarId) || 
                                                                       (x.CustomerId == customerExchangeEntity.CustomerId)) &&
                                                                      x.Transferred != null && !string.IsNullOrEmpty(x.TransfereeId) &&
                                                                      !string.IsNullOrEmpty(x.Transferee) && x.TransferDate.HasValue))
                {
                    var createdCustomerExhangeEntity = customerExchangeRepository.Insert(customerExchangeEntity);
                    _unitOfWork.SaveChanges();

                    createdCustomerExhangeDTO = _mapper.Map<DTOCustomerExchange>(createdCustomerExhangeEntity);
                }

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = createdCustomerExhangeDTO };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> EditAsync(DTOCustomerExchange customerDTO)
        {
            return Task.Run(() => {
                var originalCustomerExchangeEntity = _mapper.Map<CustomerExchange>(customerDTO);

                var edittedCustomerExchange = customerExchangeRepository.Update(originalCustomerExchangeEntity);
                _unitOfWork.SaveChanges();

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = _mapper.Map<DTOCustomerExchange>(edittedCustomerExchange) };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> CreateCarOwnerAsync(string carId, string customerId)
        {
            return Task.Run(() => {
                var existedCarOwner = customerExchangeRepository.ExistByCondition(x => x.CustomerId == customerId && x.CarId == carId
                                                                       && x.Transferred != null && !string.IsNullOrEmpty(x.TransfereeId) &&
                                                                      !string.IsNullOrEmpty(x.Transferee) && x.TransferDate.HasValue);
                if (!existedCarOwner)
                {
                    var carOwner = new CustomerExchange
                    {
                        CarId = carId,
                        CustomerId = customerId,
                        StartDate = DateTime.Now,
                        MaintenanceCount = 0
                    };
                    var createdCarOwner = customerExchangeRepository.Insert(carOwner);
                    _unitOfWork.SaveChanges();

                    return new DataResult<DTOCustomerExchange> {
                        Errors = new List<ErrorDescriber>(),
                        Target = _mapper.Map<DTOCustomerExchange>(createdCarOwner)
                    };
                }
                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = new DTOCustomerExchange() };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> UpdateCarOwnerAsync(string customerId, string carId, int customerExchangeId)
        {
            return Task.Run(() => {
                var customerExchange = customerExchangeRepository.GetFirstOrDefault(x => x.Id == customerExchangeId && x.CustomerId == customerId);
                if (customerExchange != null)
                {
                    customerExchange.CarId = carId;
                    customerExchange = customerExchangeRepository.Update(customerExchange);
                    _unitOfWork.SaveChanges();
                }
                return new DataResult<DTOCustomerExchange> { Target = _mapper.Map<DTOCustomerExchange>(customerExchange) };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> AttachNewCustomerToCustomerExchangeAsync(string customerId)
        {
            return Task.Run(() => {
                var customerExchangeEntity = new CustomerExchange
                {
                    CustomerId = customerId,
                    StartDate = DateTime.Now
                };

                customerExchangeEntity = customerExchangeRepository.Insert(customerExchangeEntity);
                _unitOfWork.SaveChanges();

                return new DataResult<DTOCustomerExchange> { Target = _mapper.Map<DTOCustomerExchange>(customerExchangeEntity) };
            });
        }

        public Task<DataResult<bool>> DeleteAsync(string carId, string customerId)
        {
            return Task.Run(() => {
                var customerExchangeRepository = _unitOfWork.GetRepository<CustomerExchange>();

                customerExchangeRepository.Delete(x => x.CarId == carId && x.CustomerId == customerId);
                _unitOfWork.SaveChanges();

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }
    }
}
