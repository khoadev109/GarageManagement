using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.Extension;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.RepositoryInterface;

namespace GarageManagement.Business.Garage
{
    public class CustomerTypeBusinessService : ServiceBase<GarageDbContext>, ICustomerTypeBusinessService
    {
        private readonly IRepository<CustomerType> _customerTypeRepository;
        private readonly IRepository<Customer> _customerRepository;
        
        public CustomerTypeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _customerTypeRepository = base.unitOfWork.GetRepository<CustomerType>();
            _customerRepository = base.unitOfWork.GetRepository<Customer>();
        }

        public Task<DataResult<List<DTOCustomerType>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var customerTypes = _customerTypeRepository.GetAll().ToList();
                customerTypes.Add(new CustomerType { Id = 0, Name = "Chọn nhóm khách hàng" });

                return new DataResult<List<DTOCustomerType>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = mapper.Map<List<DTOCustomerType>>(customerTypes.ToList())
                };
            });
        }

        public Task<DataResult<DTOCustomerType>> GetByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var customerTypeDTO = new DTOCustomerType();
                var customerType = _customerTypeRepository.GetById(id);

                if (customerType != null)
                {
                    customerTypeDTO = mapper.Map<DTOCustomerType>(customerType);
                }

                return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber>(), Target = customerTypeDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCustomerType>>> GetCustomerTypesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = GenerateDefaultSearchQuery<CustomerType>(pageIndex, pageSize);

                var sort = new FieldSortCriteria<CustomerType>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedCustomerTypes = _customerTypeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCustomerType>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCustomerType, CustomerType>(mapper, pagedCustomerTypes)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOCustomerType>> CreateCustomerTypeAsync(DTOCustomerType customerTypeDTO)
        {
            return Task.Run(() =>
            {
                var createdCustomerTypeDTO = new DTOCustomerType();
                var customerEntity = mapper.Map<CustomerType>(customerTypeDTO);

                if (!_customerTypeRepository.ExistByCondition(x => x.Name == customerEntity.Name))
                {
                    var createdCustomerTypeEntity = _customerTypeRepository.Insert(customerEntity);
                    unitOfWork.SaveChanges();

                    createdCustomerTypeDTO = mapper.Map<DTOCustomerType>(createdCustomerTypeEntity);
                }

                return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber>(), Target = createdCustomerTypeDTO };
            });
        }

        public Task<DataResult<DTOCustomerType>> EditCustomerTypeAsync(DTOCustomerType customerTypeDTO)
        {
            return Task.Run(() =>
            {
                var customerTypeEntity = mapper.Map<CustomerType>(customerTypeDTO);
                var updatedCustomerTypeDTO = new DTOCustomerType();

                if ((_customerTypeRepository.ExistByCondition(x => (x.Name == customerTypeEntity.Name && x.Id == customerTypeEntity.Id))) || (!_customerTypeRepository.ExistByCondition(x => x.Name == customerTypeEntity.Name)))
                {
                    var updatedCustomerTypeEntity = _customerTypeRepository.Update(customerTypeEntity);
                    unitOfWork.SaveChanges();

                    updatedCustomerTypeDTO = mapper.Map<DTOCustomerType>(updatedCustomerTypeEntity);

                    return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber>(), Target = updatedCustomerTypeDTO };
                }
                else
                {
                    return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Customer Type Name") }, Target = updatedCustomerTypeDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteCustomerTypeAsync(int customerTypeId)
        {
            return Task.Run(() =>
            {
                if (!_customerRepository.ExistByCondition(x => x.CustomerTypeId == customerTypeId))
                {
                    _customerTypeRepository.Delete(customerTypeId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "nhóm khách hàng");

                    return new DataResult<bool>
                    {
                        Errors = new List<ErrorDescriber> {
                        new ErrorDescriber(dependentErrorMessage) },
                        Target = false
                    };
                }
            });
        }
    }
}
