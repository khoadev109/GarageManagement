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
    public class YearBusinessService : ServiceBase<GarageDbContext>, IYearBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Year> yearRepository;
        private readonly IRepository<Car> carRepository;

        public YearBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            carRepository = _unitOfWork.GetRepository<Car>();
            yearRepository = _unitOfWork.GetRepository<Year>();
        }

        public Task<DataResult<List<DTOYear>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var years = yearRepository.GetAll(includes: x => x.Model).ToList();
                var yearsDTO = _mapper.Map<List<DTOYear>>(years);

                return new DataResult<List<DTOYear>> { Errors = new List<ErrorDescriber>(), Target = yearsDTO };
            });
        }

        public Task<DataResult<DTOYear>> GetYearByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var yearDTO = new DTOYear();
                var year = yearRepository.GetById(id);

                if (year != null)
                    yearDTO = _mapper.Map<DTOYear>(year);

                return new DataResult<DTOYear> { Errors = new List<ErrorDescriber>(), Target = yearDTO };
            });
        }

        public Task<DataResult<List<DTOYear>>> GetYearsByModelAsync(int modelId)
        {
            return Task.Run(() =>
            {
                var years = yearRepository.Get(x => x.ModelId == modelId).ToList();
                var yearsDTO = _mapper.Map<List<DTOYear>>(years);

                return new DataResult<List<DTOYear>> { Errors = new List<ErrorDescriber>(), Target = yearsDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOYear>>> GetYearsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Year>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Model";

                var sort = new FieldSortCriteria<Year>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedYears = yearRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOYear>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOYear, Year>(_mapper, pagedYears)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOYear>> CreateAsync(DTOYear yearDTO)
        {
            return Task.Run(() =>
            {
                var createdYearDTO = new DTOYear();
                var yearEntity = _mapper.Map<Year>(yearDTO);
                var createdYearEntity = yearRepository.Insert(yearEntity);

                _unitOfWork.SaveChanges();

                createdYearDTO = _mapper.Map<DTOYear>(createdYearEntity);

                return new DataResult<DTOYear> { Errors = new List<ErrorDescriber>(), Target = createdYearDTO };
            });
        }

        public Task<DataResult<DTOYear>> EditAsync(DTOYear yearDTO)
        {
            return Task.Run(() =>
            {
                var yearEntity = _mapper.Map<Year>(yearDTO);
                var updatedYearDTO = new DTOYear();

                if ((yearRepository.ExistByCondition(x => (x.Name == yearEntity.Name && x.Id == yearEntity.Id))) || (!yearRepository.ExistByCondition(x => x.Name == yearEntity.Name)))
                {
                    var updatedYearEntity = yearRepository.Update(yearEntity);
                    _unitOfWork.SaveChanges();

                    updatedYearDTO = _mapper.Map<DTOYear>(updatedYearEntity);

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
                if (!carRepository.ExistByCondition(x => x.YearId == yearId))
                {
                    yearRepository.Delete(yearId);
                    _unitOfWork.SaveChanges();

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
