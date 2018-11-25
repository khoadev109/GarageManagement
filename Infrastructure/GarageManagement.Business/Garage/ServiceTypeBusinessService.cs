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
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.Business.Garage
{
    public class ServiceTypeBusinessService : ServiceBase<GarageDbContext>, IServiceTypeBusinessService
    {
        private readonly IRepository<ServiceType> _serviceTypeRepository;
        private readonly IRepository<Service> _serviceRepository;

        public ServiceTypeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            base.mapper = mapper;
            _serviceTypeRepository = base.unitOfWork.GetRepository<ServiceType>();
            _serviceRepository = base.unitOfWork.GetRepository<Service>();
        }

        public Task<DataResult<List<DTOServiceType>>> GetAllServiceTypesAsync()
        {
            return Task.Run(() =>
            {
                var serviceTypes = _serviceTypeRepository.GetAll().ToList();
                serviceTypes.Add(new ServiceType { Id = 0, Name = "Chọn loại dịch vụ" });

                var serviceTypesDTO = mapper.Map<List<DTOServiceType>>(serviceTypes.ToList());

                return new DataResult<List<DTOServiceType>> { Errors = new List<ErrorDescriber>(), Target = serviceTypesDTO };
            });
        }

        public Task<DataResult<List<DTOServiceType>>> GetParentServiceTypesAsync()
        {
            return Task.Run(() =>
            {
                var serviceTypes = _serviceTypeRepository.Get(x => x.ParentId == null).ToList();
                serviceTypes.Add(new ServiceType { Id = 0, Name = "Chọn loại dịch vụ" });

                var serviceTypesDTO = mapper.Map<List<DTOServiceType>>(serviceTypes.ToList());

                return new DataResult<List<DTOServiceType>> { Errors = new List<ErrorDescriber>(), Target = serviceTypesDTO };
            });
        }

        public Task<DataResult<DTOServiceType>> GetServiceTypeByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var serviceTypeDTO = new DTOServiceType();
                var serviceType = _serviceTypeRepository.GetById(id);

                if (serviceType != null)
                {
                    serviceTypeDTO = mapper.Map<DTOServiceType>(serviceType);
                }

                return new DataResult<DTOServiceType> { Errors = new List<ErrorDescriber>(), Target = serviceTypeDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOServiceType>>> GetServiceTypesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                           CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<ServiceType>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;

                var sort = new FieldSortCriteria<ServiceType>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedServiceTypes = _serviceTypeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOServiceType>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOServiceType, ServiceType>(mapper, pagedServiceTypes)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOServiceType>> CreateServiceTypeAsync(DTOServiceType serviceTypeDTO)
        {
            return Task.Run(() =>
            {
                var createdServiceTypeDTO = new DTOServiceType();
                var serviceTypeEntity = mapper.Map<ServiceType>(serviceTypeDTO);

                if (!_serviceTypeRepository.ExistByCondition(x => x.Name == serviceTypeEntity.Name))
                {
                    serviceTypeEntity.ParentId = serviceTypeEntity.ParentId > 0 ? serviceTypeEntity.ParentId : null;
                    var createdServiceTypeEntity = _serviceTypeRepository.Insert(serviceTypeEntity);
                    unitOfWork.SaveChanges();

                    createdServiceTypeDTO = mapper.Map<DTOServiceType>(createdServiceTypeEntity);
                }

                return new DataResult<DTOServiceType> { Errors = new List<ErrorDescriber>(), Target = createdServiceTypeDTO };
            });
        }

        public Task<DataResult<DTOServiceType>> EditServiceTypeAsync(DTOServiceType serviceTypeDTO)
        {
            return Task.Run(() =>
            {
                var serviceTypeEntity = mapper.Map<ServiceType>(serviceTypeDTO);
                var updatedServiceTypeDTO = new DTOServiceType();

                if ((_serviceTypeRepository.ExistByCondition(x => (x.Name == serviceTypeEntity.Name && x.Id == serviceTypeEntity.Id))) || (!_serviceTypeRepository.ExistByCondition(x => x.Name == serviceTypeEntity.Name)))
                {
                    var updatedServiceTypeEntity = _serviceTypeRepository.Update(serviceTypeEntity);
                    unitOfWork.SaveChanges();

                    updatedServiceTypeDTO = mapper.Map<DTOServiceType>(updatedServiceTypeEntity);

                    return new DataResult<DTOServiceType> { Errors = new List<ErrorDescriber>(), Target = updatedServiceTypeDTO };
                }
                else
                {
                    return new DataResult<DTOServiceType> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Service Type Name") }, Target = updatedServiceTypeDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteServiceTypeAsync(int serviceTypeId)
        {
            return Task.Run(() =>
            {
                if (!_serviceRepository.ExistByCondition(x => x.ServiceTypeId == serviceTypeId))
                {
                    _serviceTypeRepository.Delete(serviceTypeId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "loại dịch vụ");

                    return new DataResult<bool>
                    {
                        Errors = new List<ErrorDescriber> { new ErrorDescriber(dependentErrorMessage) },
                        Target = false
                    };
                }
            });
        }
    }
}
