using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using Common.Core.Extension;
using System.Threading.Tasks;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.ServiceInterface;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.Business.Garage
{
    public class AccessaryBusinessService : ServiceBase<GarageDbContext>, IAccessaryBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Accessary> accessaryRepository;
        private readonly IRepository<QuotationItem> quotationItemRepository;

        public AccessaryBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            accessaryRepository = _unitOfWork.GetRepository<Accessary>();
            quotationItemRepository = _unitOfWork.GetRepository<QuotationItem>();
        }

        public Task<DataResult<List<DTOAccessary>>> GetAllAccessariesAsync()
        {
            return Task.Run(() =>
            {
                var accessaries = accessaryRepository.GetAll(includes: x => x.Unit).ToList();
                var accessariesDTO = _mapper.Map<List<DTOAccessary>>(accessaries.ToList());

                return new DataResult<List<DTOAccessary>> { Errors = new List<ErrorDescriber>(), Target = accessariesDTO };
            });
        }

        public Task<DataResult<DTOAccessary>> GetAccessaryByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var accessaryDTO = new DTOAccessary();
                var service = accessaryRepository.GetById(id);

                if (service != null)
                {
                    accessaryDTO = _mapper.Map<DTOAccessary>(service);
                }
                else
                {
                    var identityNumber = accessaryRepository.Identity(x => x.GenerateId) != null ? accessaryRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    accessaryDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Accessary.ToDefaultValue() }, NumberUnitType.Medium);
                }

                return new DataResult<DTOAccessary> { Errors = new List<ErrorDescriber>(), Target = accessaryDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOAccessary>>> GetAccessariesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Accessary>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Category,Unit,Branch";

                var sort = new FieldSortCriteria<Accessary>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Description.Contains(searchTerm));

                var pagedAccessaries = accessaryRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOAccessary>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOAccessary, Accessary>(_mapper, pagedAccessaries)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOAccessary>> CreateAccessaryAsync(DTOAccessary accessaryDTO)
        {
            return Task.Run(() =>
            {
                var createdAccessaryDTO = new DTOAccessary();
                var accessaryEntity = _mapper.Map<Accessary>(accessaryDTO);

                if (!accessaryRepository.ExistByCondition(x => x.Name == accessaryEntity.Name))
                {
                    var createdAccessaryEntity = accessaryRepository.Insert(accessaryEntity);
                    _unitOfWork.SaveChanges();

                    createdAccessaryDTO = _mapper.Map<DTOAccessary>(createdAccessaryEntity);
                }

                return new DataResult<DTOAccessary> { Errors = new List<ErrorDescriber>(), Target = createdAccessaryDTO };
            });
        }

        public Task<DataResult<DTOAccessary>> EditAccessaryAsync(DTOAccessary accessaryDTO)
        {
            return Task.Run(() =>
            {
                var updatedAccessaryDTO = new DTOAccessary();
                var accessaryEntity = _mapper.Map<Accessary>(accessaryDTO);

                if ((accessaryRepository.ExistByCondition(x => (x.Name == accessaryEntity.Name && x.Id == accessaryEntity.Id))) || (!accessaryRepository.ExistByCondition(x => x.Name == accessaryEntity.Name)))
                {
                    var updatedCustomerEntity = accessaryRepository.Update(accessaryEntity);
                    _unitOfWork.SaveChanges();

                    updatedAccessaryDTO = _mapper.Map<DTOAccessary>(updatedCustomerEntity);

                    return new DataResult<DTOAccessary> { Errors = new List<ErrorDescriber>(), Target = updatedAccessaryDTO };
                }
                else
                {
                    return new DataResult<DTOAccessary> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Accessary Name") }, Target = updatedAccessaryDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteAccessaryAsync(string accessaryId)
        {
            return Task.Run(() =>
            {
                if (!quotationItemRepository.ExistByCondition(x => x.AccessaryId == accessaryId))
                {
                    accessaryRepository.Delete(accessaryId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "phụ tùng");

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
