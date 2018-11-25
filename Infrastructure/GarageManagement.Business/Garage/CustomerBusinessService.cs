using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using Common.Core.Extension;
using Common.Core.AutoGenerate;
using Common.Core.WebAPI.Result;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using static Common.Core.Extension.AttributeExtensions;

namespace GarageManagement.Business.Garage
{
    public class CustomerBusinessService : ServiceBase<GarageDbContext>, ICustomerBusinessService
    {
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<GarageInfo> _garageInfoRepository;
        private readonly IRepository<CustomerExchange> _customerExchangeRepository;

        public CustomerBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _customerRepository = base.unitOfWork.GetRepository<Customer>();
            _garageInfoRepository = base.unitOfWork.GetRepository<GarageInfo>();
            _customerExchangeRepository = base.unitOfWork.GetRepository<CustomerExchange>();
        }

        public Task<DataResult<DTOCustomer>> GetCustomerByIdAsync(string customerId)
        {
            return Task.Run(() =>
            {
                var customerDTO = new DTOCustomer();

                var customer = _customerRepository.GetById(customerId);
                if (customer != null)
                {
                    customerDTO = mapper.Map<DTOCustomer>(customer);
                }
                else
                {
                    var identityNumber = _customerRepository.Identity(x => x.GenerateId) != null ? _customerRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    customerDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Customer.ToDefaultValue() }, NumberUnitType.Large);
                }

                return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber>(), Target = customerDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCustomer>>> GetCustomersWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                           CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var subQuery = GetFilterCustomersFromCustomerExchange(searchTerm);

                var searchQuery = new SearchQuery<Customer>();
                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Branch,CustomerType";
                searchQuery.SubqueryCondition = x => subQuery.Any(s => x.Id == s.Id);

                var pagedCustomers = _customerRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCustomer>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCustomer, Customer>(mapper, pagedCustomers)
                };

            }, cancellationToken);
        }

        public Task<DataResult<IPagedListResult<DTOCustomerExchange>>> GetCustomersLookupWithPagingAsync(List<Expression<Func<CustomerExchange, bool>>> searchTerm,
                                                                                                        string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                                        CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<CustomerExchange>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Car,Customer";

                var sort = new FieldSortCriteria<CustomerExchange>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                foreach (var searchCondition in searchTerm)
                {
                    searchQuery.AddFilter(searchCondition);
                }

                var pagedCustomerWithCar = _customerExchangeRepository.Search(searchQuery);
                var pagedCustomerWithCarDTOs = GetDefaultPagingDtoResult<DTOCustomerExchange, CustomerExchange>(mapper, pagedCustomerWithCar);

                // Mapping customer, car and quotations to DTO
                pagedCustomerWithCarDTOs.DTOs = MappingCustomerAndCarDTO(pagedCustomerWithCar.DTOs.ToList(), pagedCustomerWithCarDTOs.DTOs.ToList());

                return new DataResult<IPagedListResult<DTOCustomerExchange>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = pagedCustomerWithCarDTOs
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOCustomer>> CreateAsync(DTOCustomer customerDTO, bool isCreateGenerateId = false)
        {
            return Task.Run(() =>
            {
                var createdCustomerDTO = new DTOCustomer();

                //if (customerRepository.ExistByCondition(x => x.Name == customerDTO.Name))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Name") }, Target = customerDTO };

                //if (customerRepository.ExistByCondition(x => x.Phone == customerDTO.Phone))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Phone") }, Target = customerDTO };

                //if (customerRepository.ExistByCondition(x => !string.IsNullOrEmpty(x.Email) && x.Email == customerDTO.Email))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Email") }, Target = customerDTO };

                var customerEntity = mapper.Map<Customer>(customerDTO);

                string garageShortName = _garageInfoRepository.GetFirstOrDefault()?.ShortName;
                var identityNumber = _customerRepository.Identity(x => x.GenerateId) != null ? _customerRepository.Identity(x => x.GenerateId).GenerateId : 0;

                customerEntity.Id = garageShortName + IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Customer.ToDefaultValue() }, NumberUnitType.Large);
                customerEntity.CreatedDate = DateTime.Now;

                var createdCustomerEntity = _customerRepository.Insert(customerEntity);
                unitOfWork.SaveChanges();

                createdCustomerDTO = mapper.Map<DTOCustomer>(createdCustomerEntity);

                return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber>(), Target = createdCustomerDTO };
            });
        }

        public Task<DataResult<DTOCustomer>> EditAsync(DTOCustomer customerDTO)
        {
            return Task.Run(() =>
            {
                //if (customerRepository.ExistByCondition(x => x.Name == customerDTO.Name && x.Id != customerDTO.Id))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Name") }, Target = customerDTO };

                //if (customerRepository.ExistByCondition(x => x.Phone == customerDTO.Phone && x.Id != customerDTO.Id))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Phone") }, Target = customerDTO };

                //if (customerRepository.ExistByCondition(x => x.Email == customerDTO.Email && !string.IsNullOrEmpty(x.Email) && x.Id != customerDTO.Id))
                //    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Email") }, Target = customerDTO };

                var customerEntity = mapper.Map<Customer>(customerDTO);
                var updatedCustomerDTO = new DTOCustomer();
                if ((_customerRepository.ExistByCondition(x => (x.Name == customerEntity.Name && x.Id == customerEntity.Id))) || (!_customerRepository.ExistByCondition(x => x.Name == customerEntity.Name)))
                {
                    customerEntity.ModifiedDate = DateTime.Now;

                    var updatedCustomerEntity = _customerRepository.Update(customerEntity);
                    unitOfWork.SaveChanges();

                    updatedCustomerDTO = mapper.Map<DTOCustomer>(updatedCustomerEntity);

                    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber>(), Target = updatedCustomerDTO };
                }
                else
                {
                    return new DataResult<DTOCustomer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Name") }, Target = updatedCustomerDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteAsync(string customerId)
        {
            return Task.Run(() =>
            {
                if (!_customerExchangeRepository.ExistByCondition(x => x.CustomerId == customerId))
                {
                    _customerRepository.Delete(customerId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "khách hàng");

                    return new DataResult<bool>
                    {
                        Target = false,
                        Errors = new List<ErrorDescriber> { new ErrorDescriber(dependentErrorMessage) }
                    };
                }
            });
        }

        private List<DTOCustomerExchange> MappingCustomerAndCarDTO(List<CustomerExchange> customerExchanges, List<DTOCustomerExchange> customerExchangeDTOs)
        {
            int index = 0;
            customerExchanges.ForEach(x =>
            {
                var customerExchangeDTO = customerExchangeDTOs[index];
                if (customerExchangeDTO != null)
                {
                    customerExchangeDTO.Car = mapper.Map<DTOCar>(x.Car);
                    customerExchangeDTO.Customer = mapper.Map<DTOCustomer>(x.Customer);
                    customerExchangeDTO.Quotations = mapper.Map<List<DTOQuotation>>(x.Quotations);
                }
                index++;
            });

            return customerExchangeDTOs;
        }

        private IQueryable<Customer> GetFilterCustomersFromCustomerExchange(string searchTerm)
        {
            var query = unitOfWork.DbContext.CustomerExchanges.Include("Customer,Car");

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(x => (x.CustomerId.Contains(searchTerm) ||
                                          x.Customer.Name.Contains(searchTerm) ||
                                          x.Customer.Phone.Contains(searchTerm) ||
                                          x.Car.LicensePlates.Contains(searchTerm)));
            }

            var filterredQuery = query.GroupBy(g => g.Customer).Select(x => x.Key);

            return filterredQuery;
        }
    }
}
