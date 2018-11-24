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
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using Common.Core.Extension;

namespace GarageManagement.Business.Garage
{
    public class ServiceTypeBusinessService : ServiceBase<GarageDbContext>, IServiceTypeBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<ServiceType> serviceTypeRepository;
        private readonly IRepository<Service> serviceRepository;


        public ServiceTypeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            serviceTypeRepository = _unitOfWork.GetRepository<ServiceType>();
            serviceRepository = _unitOfWork.GetRepository<Service>();
        }

        public Task<DataResult<List<DTOServiceType>>> GetAllServiceTypesAsync()
        {
            return Task.Run(() =>
            {
                var serviceTypes = serviceTypeRepository.GetAll().ToList();
                serviceTypes.Add(new ServiceType { Id = 0, Name = "Chọn loại dịch vụ" });

                var serviceTypesDTO = _mapper.Map<List<DTOServiceType>>(serviceTypes.ToList());

                return new DataResult<List<DTOServiceType>> { Errors = new List<ErrorDescriber>(), Target = serviceTypesDTO };
            });
        }

        public Task<DataResult<List<DTOServiceType>>> GetParentServiceTypesAsync()
        {
            return Task.Run(() =>
            {
                var serviceTypes = serviceTypeRepository.Get(x => x.ParentId == null).ToList();
                serviceTypes.Add(new ServiceType { Id = 0, Name = "Chọn loại dịch vụ" });

                var serviceTypesDTO = _mapper.Map<List<DTOServiceType>>(serviceTypes.ToList());

                return new DataResult<List<DTOServiceType>> { Errors = new List<ErrorDescriber>(), Target = serviceTypesDTO };
            });
        }

        public Task<DataResult<DTOServiceType>> GetServiceTypeByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var serviceTypeDTO = new DTOServiceType();
                var serviceType = serviceTypeRepository.GetById(id);

                if (serviceType != null)
                {
                    serviceTypeDTO = _mapper.Map<DTOServiceType>(serviceType);
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

                var pagedServiceTypes = serviceTypeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOServiceType>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOServiceType, ServiceType>(_mapper, pagedServiceTypes)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOServiceType>> CreateServiceTypeAsync(DTOServiceType serviceTypeDTO)
        {
            return Task.Run(() =>
            {
                var createdServiceTypeDTO = new DTOServiceType();
                var serviceTypeEntity = _mapper.Map<ServiceType>(serviceTypeDTO);

                if (!serviceTypeRepository.ExistByCondition(x => x.Name == serviceTypeEntity.Name))
                {
                    serviceTypeEntity.ParentId = serviceTypeEntity.ParentId > 0 ? serviceTypeEntity.ParentId : null;
                    var createdServiceTypeEntity = serviceTypeRepository.Insert(serviceTypeEntity);
                    _unitOfWork.SaveChanges();

                    createdServiceTypeDTO = _mapper.Map<DTOServiceType>(createdServiceTypeEntity);
                }

                return new DataResult<DTOServiceType> { Errors = new List<ErrorDescriber>(), Target = createdServiceTypeDTO };
            });
        }

        public Task<DataResult<DTOServiceType>> EditServiceTypeAsync(DTOServiceType serviceTypeDTO)
        {
            return Task.Run(() =>
            {
                var serviceTypeEntity = _mapper.Map<ServiceType>(serviceTypeDTO);
                var updatedServiceTypeDTO = new DTOServiceType();

                if ((serviceTypeRepository.ExistByCondition(x => (x.Name == serviceTypeEntity.Name && x.Id == serviceTypeEntity.Id))) || (!serviceTypeRepository.ExistByCondition(x => x.Name == serviceTypeEntity.Name)))
                {
                    var updatedServiceTypeEntity = serviceTypeRepository.Update(serviceTypeEntity);
                    _unitOfWork.SaveChanges();

                    updatedServiceTypeDTO = _mapper.Map<DTOServiceType>(updatedServiceTypeEntity);

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
                if (!serviceRepository.ExistByCondition(x => x.ServiceTypeId == serviceTypeId))
                {
                    serviceTypeRepository.Delete(serviceTypeId);
                    _unitOfWork.SaveChanges();

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
