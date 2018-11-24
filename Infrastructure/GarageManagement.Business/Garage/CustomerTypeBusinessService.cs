using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface.Paging;

using GarageManagement.RepositoryInterface;
using Common.Core.Extension;

namespace GarageManagement.Business.Garage
{
    public class CustomerTypeBusinessService : ServiceBase<GarageDbContext>, ICustomerTypeBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<CustomerType> customerTypeRepository;
        private readonly IRepository<Customer> customerRepository;


        public CustomerTypeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            customerTypeRepository = _unitOfWork.GetRepository<CustomerType>();
            customerRepository = _unitOfWork.GetRepository<Customer>();
        }

        public Task<DataResult<List<DTOCustomerType>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var customerTypes = customerTypeRepository.GetAll().ToList();

                customerTypes.Add(new CustomerType { Id = 0, Name = "Chọn nhóm khách hàng" });

                var customerTypesDTO = _mapper.Map<List<DTOCustomerType>>(customerTypes.ToList());

                return new DataResult<List<DTOCustomerType>> { Errors = new List<ErrorDescriber>(), Target = customerTypesDTO };
            });
        }

        public Task<DataResult<DTOCustomerType>> GetByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var customerTypeDTO = new DTOCustomerType();
                var customerType = customerTypeRepository.GetById(id);

                if (customerType != null)
                    customerTypeDTO = _mapper.Map<DTOCustomerType>(customerType);

                return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber>(), Target = customerTypeDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCustomerType>>> GetCustomerTypesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<CustomerType>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;

                var sort = new FieldSortCriteria<CustomerType>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedCustomerTypes = customerTypeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCustomerType>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCustomerType, CustomerType>(_mapper, pagedCustomerTypes)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOCustomerType>> CreateCustomerTypeAsync(DTOCustomerType customerTypeDTO)
        {
            return Task.Run(() =>
            {
                var createdCustomerTypeDTO = new DTOCustomerType();
                var customerEntity = _mapper.Map<CustomerType>(customerTypeDTO);

                if (!customerTypeRepository.ExistByCondition(x => x.Name == customerEntity.Name))
                {
                    var createdCustomerTypeEntity = customerTypeRepository.Insert(customerEntity);
                    _unitOfWork.SaveChanges();

                    createdCustomerTypeDTO = _mapper.Map<DTOCustomerType>(createdCustomerTypeEntity);
                }

                return new DataResult<DTOCustomerType> { Errors = new List<ErrorDescriber>(), Target = createdCustomerTypeDTO };
            });
        }

        public Task<DataResult<DTOCustomerType>> EditCustomerTypeAsync(DTOCustomerType customerTypeDTO)
        {
            return Task.Run(() =>
            {
                var customerTypeEntity = _mapper.Map<CustomerType>(customerTypeDTO);
                var updatedCustomerTypeDTO = new DTOCustomerType();

                if ((customerTypeRepository.ExistByCondition(x => (x.Name == customerTypeEntity.Name && x.Id == customerTypeEntity.Id))) || (!customerTypeRepository.ExistByCondition(x => x.Name == customerTypeEntity.Name)))
                {
                    var updatedCustomerTypeEntity = customerTypeRepository.Update(customerTypeEntity);
                    _unitOfWork.SaveChanges();

                    updatedCustomerTypeDTO = _mapper.Map<DTOCustomerType>(updatedCustomerTypeEntity);

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
                if (!customerRepository.ExistByCondition(x => x.CustomerTypeId == customerTypeId))
                {
                    customerTypeRepository.Delete(customerTypeId);
                    _unitOfWork.SaveChanges();

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
