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
    public class YearBusinessService : ServiceBase<GarageDbContext>, IYearBusinessService
    {
        private readonly IRepository<Year> _yearRepository;
        private readonly IRepository<Car> _carRepository;

        public YearBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _carRepository = base.unitOfWork.GetRepository<Car>();
            _yearRepository = base.unitOfWork.GetRepository<Year>();
        }

        public Task<DataResult<List<DTOYear>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var years = _yearRepository.GetAll(includes: x => x.Model).ToList();
                var yearsDTO = mapper.Map<List<DTOYear>>(years);

                return new DataResult<List<DTOYear>> { Errors = new List<ErrorDescriber>(), Target = yearsDTO };
            });
        }

        public Task<DataResult<DTOYear>> GetYearByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var yearDTO = new DTOYear();
                var year = _yearRepository.GetById(id);

                if (year != null)
                    yearDTO = mapper.Map<DTOYear>(year);

                return new DataResult<DTOYear> { Errors = new List<ErrorDescriber>(), Target = yearDTO };
            });
        }

        public Task<DataResult<List<DTOYear>>> GetYearsByModelAsync(int modelId)
        {
            return Task.Run(() =>
            {
                var years = _yearRepository.Get(x => x.ModelId == modelId).ToList();
                var yearsDTO = mapper.Map<List<DTOYear>>(years);

                return new DataResult<List<DTOYear>> { Errors = new List<ErrorDescriber>(), Target = yearsDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOYear>>> GetYearsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = GenerateDefaultSearchQuery<Year>(pageIndex, pageSize);

                searchQuery.IncludeProperties = "Model";

                var sort = new FieldSortCriteria<Year>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedYears = _yearRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOYear>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOYear, Year>(mapper, pagedYears)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOYear>> CreateAsync(DTOYear yearDTO)
        {
            return Task.Run(() =>
            {
                var createdYearDTO = new DTOYear();
                var yearEntity = mapper.Map<Year>(yearDTO);
                var createdYearEntity = _yearRepository.Insert(yearEntity);

                unitOfWork.SaveChanges();

                createdYearDTO = mapper.Map<DTOYear>(createdYearEntity);

                return new DataResult<DTOYear> { Errors = new List<ErrorDescriber>(), Target = createdYearDTO };
            });
        }

        public Task<DataResult<DTOYear>> EditAsync(DTOYear yearDTO)
        {
            return Task.Run(() =>
            {
                var yearEntity = mapper.Map<Year>(yearDTO);
                var updatedYearDTO = new DTOYear();

                if ((_yearRepository.ExistByCondition(x => (x.Name == yearEntity.Name && x.Id == yearEntity.Id))) || (!_yearRepository.ExistByCondition(x => x.Name == yearEntity.Name)))
                {
                    var updatedYearEntity = _yearRepository.Update(yearEntity);
                    unitOfWork.SaveChanges();

                    updatedYearDTO = mapper.Map<DTOYear>(updatedYearEntity);

                    return new DataResult<DTOYear> { Errors = new List<ErrorDescriber>(), Target = updatedYearDTO };
                }
                else
                {
                    return new DataResult<DTOYear> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Year Name") }, Target = updatedYearDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteAsync(int yearId)
        {
            return Task.Run(() =>
            {
                if (!_carRepository.ExistByCondition(x => x.YearId == yearId))
                {
                    _yearRepository.Delete(yearId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "năm");

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
