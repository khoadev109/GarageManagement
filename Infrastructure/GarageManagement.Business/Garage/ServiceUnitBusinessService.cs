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
    public class ServiceUnitBusinessService : ServiceBase<GarageDbContext>, IServiceUnitBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<ServiceUnit> serviceUnitRepository;
        private readonly IRepository<Service> serviceRepository;

        public ServiceUnitBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            serviceUnitRepository = _unitOfWork.GetRepository<ServiceUnit>();
            serviceRepository = _unitOfWork.GetRepository<Service>();
        }

        public Task<DataResult<List<DTOServiceUnit>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var units = serviceUnitRepository.GetAll().ToList();
                units.Add(new ServiceUnit { Id = 0, Name = "Chọn đơn vị" });

                var unitsDTO = _mapper.Map<List<DTOServiceUnit>>(units.ToList());

                return new DataResult<List<DTOServiceUnit>> { Errors = new List<ErrorDescriber>(), Target = unitsDTO };
            });
        }

        public Task<DataResult<DTOServiceUnit>> GetByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var serviceUnitDTO = new DTOServiceUnit();
                var service = serviceUnitRepository.GetById(id);

                if (service != null)
                    serviceUnitDTO = _mapper.Map<DTOServiceUnit>(service);

                return new DataResult<DTOServiceUnit> { Errors = new List<ErrorDescriber>(), Target = serviceUnitDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOServiceUnit>>> GetServiceUnitWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<ServiceUnit>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "";

                var sort = new FieldSortCriteria<ServiceUnit>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedServicesUnit = serviceUnitRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOServiceUnit>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOServiceUnit, ServiceUnit>(_mapper, pagedServicesUnit)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOServiceUnit>> CreateAsync(DTOServiceUnit serviceUnitDTO)
        {
            return Task.Run(() =>
            {
                var createdServiceUnitDTO = new DTOServiceUnit();
                var serviceUnitEntity = _mapper.Map<ServiceUnit>(serviceUnitDTO);

                if (!serviceUnitRepository.ExistByCondition(x => x.Name == serviceUnitEntity.Name))
                {
                    var createdAccessaryUnitEntity = serviceUnitRepository.Insert(serviceUnitEntity);
                    _unitOfWork.SaveChanges();

                    createdServiceUnitDTO = _mapper.Map<DTOServiceUnit>(createdAccessaryUnitEntity);
                }

                return new DataResult<DTOServiceUnit> { Errors = new List<ErrorDescriber>(), Target = createdServiceUnitDTO };
            });
        }

        public Task<DataResult<DTOServiceUnit>> EditAsync(DTOServiceUnit serviceUnitDTO)
        {
            return Task.Run(() =>
            {
                var serivceUnitEntity = _mapper.Map<ServiceUnit>(serviceUnitDTO);
                var updatedServiceUnitDTO = new DTOServiceUnit();

                if ((serviceUnitRepository.ExistByCondition(x => (x.Name == serivceUnitEntity.Name && x.Id == serivceUnitEntity.Id))) || (!serviceUnitRepository.ExistByCondition(x => x.Name == serivceUnitEntity.Name)))
                {
                    var updatedCustomerEntity = serviceUnitRepository.Update(serivceUnitEntity);
                    _unitOfWork.SaveChanges();

                    updatedServiceUnitDTO = _mapper.Map<DTOServiceUnit>(updatedCustomerEntity);

                    return new DataResult<DTOServiceUnit> { Errors = new List<ErrorDescriber>(), Target = updatedServiceUnitDTO };
                }
                else
                {
                    return new DataResult<DTOServiceUnit> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Service Unit Name") }, Target = updatedServiceUnitDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteAsync(int serviceUnitId)
        {
            return Task.Run(() =>
            {
                if (!serviceRepository.ExistByCondition(x => x.UnitId == serviceUnitId))
                {
                    serviceUnitRepository.Delete(serviceUnitId);
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
