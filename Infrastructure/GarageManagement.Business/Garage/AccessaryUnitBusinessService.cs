using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using Common.Core.Extension;
using System.Threading.Tasks;
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
    public class AccessaryUnitBusinessService : ServiceBase<GarageDbContext>, IAccessaryUnitBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<AccessaryUnit> accessaryUnitRepository;
        private readonly IRepository<Accessary> accessaryRepository;

        public AccessaryUnitBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            accessaryUnitRepository = _unitOfWork.GetRepository<AccessaryUnit>();
            accessaryRepository = _unitOfWork.GetRepository<Accessary>();
        }

        public Task<DataResult<List<DTOAccessaryUnit>>> GetAllAsync()
        {
            return Task.Run(() => {
                var units = accessaryUnitRepository.GetAll().ToList();
                units.Add(new AccessaryUnit { Id = 0, Name = "Chọn đơn vị" });

                var unitsDTO = _mapper.Map<List<DTOAccessaryUnit>>(units.ToList());

                return new DataResult<List<DTOAccessaryUnit>> { Errors = new List<ErrorDescriber>(), Target = unitsDTO };
            });
        }

        public Task<DataResult<DTOAccessaryUnit>> GetByIdAsync(int id)
        {
            return Task.Run(() => {
                var accessaryUnitDTO = new DTOAccessaryUnit();

                var service = accessaryUnitRepository.GetById(id);
                if (service != null)
                {
                    accessaryUnitDTO = _mapper.Map<DTOAccessaryUnit>(service);
                }

                return new DataResult<DTOAccessaryUnit> { Errors = new List<ErrorDescriber>(), Target = accessaryUnitDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOAccessaryUnit>>> GetAccessaryWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<AccessaryUnit>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "";

                var sort = new FieldSortCriteria<AccessaryUnit>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedAccessariesUnit = _unitOfWork.GetRepository<AccessaryUnit>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOAccessaryUnit>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOAccessaryUnit, AccessaryUnit>(_mapper, pagedAccessariesUnit)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOAccessaryUnit>> CreateAsync(DTOAccessaryUnit accessaryUnitDTO)
        {
            return Task.Run(() => {
                var createdAccessaryUnitDTO = new DTOAccessaryUnit();
                var accessaryUnitEntity = _mapper.Map<AccessaryUnit>(accessaryUnitDTO);

                if (!accessaryUnitRepository.ExistByCondition(x => x.Name == accessaryUnitEntity.Name))
                {
                    var createdAccessaryUnitEntity = accessaryUnitRepository.Insert(accessaryUnitEntity);
                    _unitOfWork.SaveChanges();

                    createdAccessaryUnitDTO = _mapper.Map<DTOAccessaryUnit>(createdAccessaryUnitEntity);
                }

                return new DataResult<DTOAccessaryUnit> { Errors = new List<ErrorDescriber>(), Target = createdAccessaryUnitDTO };
            });
        }

        public Task<DataResult<DTOAccessaryUnit>> EditAsync(DTOAccessaryUnit accessaryUnitDTO)
        {
            return Task.Run(() => {
                var accessaryUnitEntity = _mapper.Map<AccessaryUnit>(accessaryUnitDTO);
                var updatedAccessaryUnitDTO = new DTOAccessaryUnit();

                if ((accessaryUnitRepository.ExistByCondition(x => (x.Name == accessaryUnitEntity.Name && x.Id == accessaryUnitEntity.Id))) || (!accessaryUnitRepository.ExistByCondition(x => x.Name == accessaryUnitEntity.Name)))
                {
                    var updatedAccessaryUnitEntity = accessaryUnitRepository.Update(accessaryUnitEntity);
                    _unitOfWork.SaveChanges();

                    updatedAccessaryUnitDTO = _mapper.Map<DTOAccessaryUnit>(updatedAccessaryUnitEntity);

                    return new DataResult<DTOAccessaryUnit> { Errors = new List<ErrorDescriber>(), Target = updatedAccessaryUnitDTO };
                }
                else
                {
                    return new DataResult<DTOAccessaryUnit> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Accessary Unit Name") }, Target = updatedAccessaryUnitDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteAsync(int accessaryUnitId)
        {
            return Task.Run(() => {
                if(!accessaryRepository.ExistByCondition(x => x.UnitId == accessaryUnitId))
                {
                    accessaryUnitRepository.Delete(accessaryUnitId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "đơn vị tính");

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
