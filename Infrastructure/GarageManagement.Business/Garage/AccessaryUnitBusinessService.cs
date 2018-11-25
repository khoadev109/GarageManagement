using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using Common.Core.Extension;
using System.Threading.Tasks;
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
    public class AccessaryUnitBusinessService : ServiceBase<GarageDbContext>, IAccessaryUnitBusinessService
    {
        private readonly IRepository<AccessaryUnit> _accessaryUnitRepository;
        private readonly IRepository<Accessary> _accessaryRepository;

        public AccessaryUnitBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _accessaryUnitRepository = base.unitOfWork.GetRepository<AccessaryUnit>();
            _accessaryRepository = base.unitOfWork.GetRepository<Accessary>();
        }

        public Task<DataResult<List<DTOAccessaryUnit>>> GetAllAsync()
        {
            return Task.Run(() => {
                var units = _accessaryUnitRepository.GetAll().ToList();
                units.Add(new AccessaryUnit { Id = 0, Name = "Chọn đơn vị" });

                var unitsDTO = mapper.Map<List<DTOAccessaryUnit>>(units.ToList());

                return new DataResult<List<DTOAccessaryUnit>> { Errors = new List<ErrorDescriber>(), Target = unitsDTO };
            });
        }

        public Task<DataResult<DTOAccessaryUnit>> GetByIdAsync(int id)
        {
            return Task.Run(() => {
                var accessaryUnitDTO = new DTOAccessaryUnit();

                var service = _accessaryUnitRepository.GetById(id);
                if (service != null)
                {
                    accessaryUnitDTO = mapper.Map<DTOAccessaryUnit>(service);
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

                var pagedAccessariesUnit = unitOfWork.GetRepository<AccessaryUnit>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOAccessaryUnit>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOAccessaryUnit, AccessaryUnit>(mapper, pagedAccessariesUnit)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOAccessaryUnit>> CreateAsync(DTOAccessaryUnit accessaryUnitDTO)
        {
            return Task.Run(() => {
                var createdAccessaryUnitDTO = new DTOAccessaryUnit();
                var accessaryUnitEntity = mapper.Map<AccessaryUnit>(accessaryUnitDTO);

                if (!_accessaryUnitRepository.ExistByCondition(x => x.Name == accessaryUnitEntity.Name))
                {
                    var createdAccessaryUnitEntity = _accessaryUnitRepository.Insert(accessaryUnitEntity);
                    unitOfWork.SaveChanges();

                    createdAccessaryUnitDTO = mapper.Map<DTOAccessaryUnit>(createdAccessaryUnitEntity);
                }

                return new DataResult<DTOAccessaryUnit> { Errors = new List<ErrorDescriber>(), Target = createdAccessaryUnitDTO };
            });
        }

        public Task<DataResult<DTOAccessaryUnit>> EditAsync(DTOAccessaryUnit accessaryUnitDTO)
        {
            return Task.Run(() => {
                var accessaryUnitEntity = mapper.Map<AccessaryUnit>(accessaryUnitDTO);
                var updatedAccessaryUnitDTO = new DTOAccessaryUnit();

                if ((_accessaryUnitRepository.ExistByCondition(x => (x.Name == accessaryUnitEntity.Name && x.Id == accessaryUnitEntity.Id))) || (!_accessaryUnitRepository.ExistByCondition(x => x.Name == accessaryUnitEntity.Name)))
                {
                    var updatedAccessaryUnitEntity = _accessaryUnitRepository.Update(accessaryUnitEntity);
                    unitOfWork.SaveChanges();

                    updatedAccessaryUnitDTO = mapper.Map<DTOAccessaryUnit>(updatedAccessaryUnitEntity);

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
                if(!_accessaryRepository.ExistByCondition(x => x.UnitId == accessaryUnitId))
                {
                    _accessaryUnitRepository.Delete(accessaryUnitId);
                    unitOfWork.SaveChanges();

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
