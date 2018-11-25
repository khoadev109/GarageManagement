using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
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
        private readonly IRepository<CustomerExchange> _customerExchangeRepository;

        public CustomerExchangeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _customerExchangeRepository = base.unitOfWork.GetRepository<CustomerExchange>();
        }

        public Task<DataResult<DTOCustomerExchange>> GetCustomerExchangeByCustomerAndCarIdAsync(string customerId, string carId)
        {
            return Task.Run(() => {
                var customerExchange = _customerExchangeRepository.GetFirstOrDefault(x => x.CustomerId == customerId && (string.IsNullOrEmpty(carId) || x.CarId == carId), 
                                                    includes: new Expression<Func<CustomerExchange, object>>[]{ x => x.Customer, x => x.Car });

                var customerExchangeDTO = customerExchange != null ? mapper.Map<DTOCustomerExchange>(customerExchange) : new DTOCustomerExchange();

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
                var customerExchange = _customerExchangeRepository.GetFirstOrDefault(x => x.CustomerId == customerId && !string.IsNullOrEmpty(x.CarId), includes: includes);
                if (customerExchange != null)
                    customerExchangeDTO = mapper.Map<DTOCustomerExchange>(customerExchange);

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

                var pagedCustomerExchange = unitOfWork.GetRepository<CustomerExchange>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOCustomerExchange>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCustomerExchange, CustomerExchange>(mapper, pagedCustomerExchange)
                };

            }, cancellationToken);
        }

        public Task<DataResult<List<DTOCustomerExchange>>> GetCustomerAndOwnedCarsAsync()
        {
            return Task.Run(() => {
                var customerExchangeDTOs = new List<DTOCustomerExchange>();

                var groupCustomerExchange = _customerExchangeRepository.Query().GroupBy(g => g.CustomerId)
                                                                      .Select(y => new { CustomerId = y.Key, Count = y.Count() });

                var customerExchange = _customerExchangeRepository.Query().Join(groupCustomerExchange,
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
                    customerExchangeDTOs = mapper.Map<List<DTOCustomerExchange>>(customerExchange);
                
                return new DataResult<List<DTOCustomerExchange>> { Errors = new List<ErrorDescriber>(), Target = customerExchangeDTOs };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> CreateAsync(DTOCustomerExchange customerDTO)
        {
            return Task.Run(() => {
                var createdCustomerExhangeDTO = new DTOCustomerExchange();
                var customerExchangeEntity = mapper.Map<CustomerExchange>(createdCustomerExhangeDTO);

                if (!_customerExchangeRepository.ExistByCondition(x => ((x.CustomerId == customerExchangeEntity.CustomerId && x.CarId == customerExchangeEntity.CarId) || 
                                                                       (x.CustomerId == customerExchangeEntity.CustomerId)) &&
                                                                      x.Transferred != null && !string.IsNullOrEmpty(x.TransfereeId) &&
                                                                      !string.IsNullOrEmpty(x.Transferee) && x.TransferDate.HasValue))
                {
                    var createdCustomerExhangeEntity = _customerExchangeRepository.Insert(customerExchangeEntity);
                    unitOfWork.SaveChanges();

                    createdCustomerExhangeDTO = mapper.Map<DTOCustomerExchange>(createdCustomerExhangeEntity);
                }

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = createdCustomerExhangeDTO };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> EditAsync(DTOCustomerExchange customerDTO)
        {
            return Task.Run(() => {
                var originalCustomerExchangeEntity = mapper.Map<CustomerExchange>(customerDTO);

                var edittedCustomerExchange = _customerExchangeRepository.Update(originalCustomerExchangeEntity);
                unitOfWork.SaveChanges();

                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = mapper.Map<DTOCustomerExchange>(edittedCustomerExchange) };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> CreateCarOwnerAsync(string carId, string customerId)
        {
            return Task.Run(() => {
                var existedCarOwner = _customerExchangeRepository.ExistByCondition(x => x.CustomerId == customerId && x.CarId == carId
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
                    var createdCarOwner = _customerExchangeRepository.Insert(carOwner);
                    unitOfWork.SaveChanges();

                    return new DataResult<DTOCustomerExchange> {
                        Errors = new List<ErrorDescriber>(),
                        Target = mapper.Map<DTOCustomerExchange>(createdCarOwner)
                    };
                }
                return new DataResult<DTOCustomerExchange> { Errors = new List<ErrorDescriber>(), Target = new DTOCustomerExchange() };
            });
        }

        public Task<DataResult<DTOCustomerExchange>> UpdateCarOwnerAsync(string customerId, string carId, int customerExchangeId)
        {
            return Task.Run(() => {
                var customerExchange = _customerExchangeRepository.GetFirstOrDefault(x => x.Id == customerExchangeId && x.CustomerId == customerId);
                if (customerExchange != null)
                {
                    customerExchange.CarId = carId;
                    customerExchange = _customerExchangeRepository.Update(customerExchange);
                    unitOfWork.SaveChanges();
                }
                return new DataResult<DTOCustomerExchange> { Target = mapper.Map<DTOCustomerExchange>(customerExchange) };
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

                customerExchangeEntity = _customerExchangeRepository.Insert(customerExchangeEntity);
                unitOfWork.SaveChanges();

                return new DataResult<DTOCustomerExchange> { Target = mapper.Map<DTOCustomerExchange>(customerExchangeEntity) };
            });
        }

        public Task<DataResult<bool>> DeleteAsync(string carId, string customerId)
        {
            return Task.Run(() => {
                var customerExchangeRepository = unitOfWork.GetRepository<CustomerExchange>();

                customerExchangeRepository.Delete(x => x.CarId == carId && x.CustomerId == customerId);
                unitOfWork.SaveChanges();

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }
    }
}
