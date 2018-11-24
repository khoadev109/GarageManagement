using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using Common.Core.Extension;
using System.Threading.Tasks;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.Business.Garage
{
    public class ServiceBusinessService : ServiceBase<GarageDbContext>, IServiceBusinessService
    {
        public IMapper _mapper;
        private readonly IRepository<Service> serviceRepository;
        private readonly IRepository<QuotationItem> quotationItemRepository;

        public ServiceBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            serviceRepository = _unitOfWork.GetRepository<Service>();
            quotationItemRepository = _unitOfWork.GetRepository<QuotationItem>();
        }

        public Task<DataResult<List<DTOService>>> GetAllServicesAsync()
        {
            return Task.Run(() =>
            {
                var services = serviceRepository.GetAll(includes: x => x.Unit).ToList();

                return new DataResult<List<DTOService>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = _mapper.Map<List<DTOService>>(services)
                };
            });
        }

        public Task<DataResult<DTOService>> GetServiceByIdAsync(string id)
        {
            return Task.Run(() => {
                var serviceDTO = new DTOService();
                
                var service = serviceRepository.GetById(id);
                if (service != null)
                {
                    serviceDTO = _mapper.Map<DTOService>(service);
                }
                else
                {
                    var identityNumber = serviceRepository.Identity(x => x.GenerateId) != null ? serviceRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    serviceDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Service.ToDefaultValue() }, NumberUnitType.Small);
                }

                return new DataResult<DTOService> { Errors = new List<ErrorDescriber>(), Target = serviceDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOService>>> GetServicesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<Service>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "ServiceType,Unit,Branch";

                var sort = new FieldSortCriteria<Service>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Description.Contains(searchTerm));

                var pagedServices = serviceRepository.Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOService>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOService, Service>(_mapper, pagedServices)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOService>> CreateServiceAsync(DTOService serviceDTO)
        {
            return Task.Run(() => {

                var createdServiceDTO = new DTOService();
                var serviceEntity = _mapper.Map<Service>(serviceDTO);
                if (!serviceRepository.ExistByCondition(x => x.Name == serviceEntity.Name))
                {
                    var createdServiceEntity = serviceRepository.Insert(serviceEntity);
                    _unitOfWork.SaveChanges();

                    createdServiceDTO = _mapper.Map<DTOService>(createdServiceEntity);
                }

                return new DataResult<DTOService> { Errors = new List<ErrorDescriber>(), Target = createdServiceDTO };
            });
        }

        public Task<DataResult<DTOService>> EditServiceAsync(DTOService serviceDTO)
        {
            return Task.Run(() => {
                var serviceRepository = _unitOfWork.GetRepository<Service>();
                var updatedServiceDTO = new DTOService();

                var serviceEntity = _mapper.Map<Service>(serviceDTO);
                if ((serviceRepository.ExistByCondition(x => (x.Name == serviceEntity.Name && x.Id == serviceEntity.Id))) || (!serviceRepository.ExistByCondition(x => x.Name == serviceEntity.Name)))
                {
                    var updatedServiceEntity = serviceRepository.Update(serviceEntity);
                    _unitOfWork.SaveChanges();

                    updatedServiceDTO = _mapper.Map<DTOService>(updatedServiceEntity);

                    return new DataResult<DTOService> { Errors = new List<ErrorDescriber>(), Target = updatedServiceDTO };
                }
                else
                {
                    return new DataResult<DTOService> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Employee Name") }, Target = updatedServiceDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteServiceAsync(string serviceId)
        {
            return Task.Run(() => {
                if (!quotationItemRepository.ExistByCondition(x => x.ServiceId == serviceId))
                {
                    serviceRepository.Delete(serviceId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "dịch vụ");

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
