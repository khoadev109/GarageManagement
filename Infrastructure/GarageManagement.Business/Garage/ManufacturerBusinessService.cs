using System;
using AutoMapper;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;

using GarageManagement.RepositoryInterface.Paging;
using Common.Core.Extension;

namespace GarageManagement.Business.Garage
{
    public class ManufacturerBusinessService : ServiceBase<GarageDbContext>, IManufacturerBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Manufacturer> manufacturerRepository;
        private readonly IRepository<Car> carRepository;

        public ManufacturerBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            manufacturerRepository = _unitOfWork.GetRepository<Manufacturer>();
            carRepository = _unitOfWork.GetRepository<Car>();
        }

        public Task<DataResult<List<DTOManufacturer>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var manufacturers = manufacturerRepository.GetAll();
                var manufacturersDto = _mapper.Map<List<DTOManufacturer>>(manufacturers);

                return new DataResult<List<DTOManufacturer>> { Errors = new List<ErrorDescriber>(), Target = manufacturersDto };
            });
        }

        public Task<DataResult<DTOManufacturer>> GetManufacturerByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var manufacturerDTO = new DTOManufacturer();
                var manufacturer = manufacturerRepository.GetById(id);

                if (manufacturer != null)
                    manufacturerDTO = _mapper.Map<DTOManufacturer>(manufacturer);

                return new DataResult<DTOManufacturer> { Errors = new List<ErrorDescriber>(), Target = manufacturerDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOManufacturer>>> GetManufacturersWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Manufacturer>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;

                var sort = new FieldSortCriteria<Manufacturer>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Description.Contains(searchTerm));

                var pagedManufacturers = manufacturerRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOManufacturer>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOManufacturer, Manufacturer>(_mapper, pagedManufacturers)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOManufacturer>> CreateManufacturerAsync(DTOManufacturer manufacturerDTO)
        {
            return Task.Run(() =>
            {
                var createdManufacturerDTO = new DTOManufacturer();
                var manufacturerEntity = _mapper.Map<Manufacturer>(manufacturerDTO);
                var createdManufacturerEntity = manufacturerRepository.Insert(manufacturerEntity);

                _unitOfWork.SaveChanges();

                createdManufacturerDTO = _mapper.Map<DTOManufacturer>(createdManufacturerEntity);

                return new DataResult<DTOManufacturer> { Errors = new List<ErrorDescriber>(), Target = createdManufacturerDTO };
            });
        }

        public Task<DataResult<DTOManufacturer>> EditManufacturerAsync(DTOManufacturer manufacturerDTO)
        {
            return Task.Run(() =>
            {
                var manufacturerEntity = _mapper.Map<Manufacturer>(manufacturerDTO);
                var updatedManufacturerDTO = new DTOManufacturer();

                if ((manufacturerRepository.ExistByCondition(x => (x.Name == manufacturerEntity.Name && x.Id == manufacturerEntity.Id))) || (!manufacturerRepository.ExistByCondition(x => x.Name == manufacturerEntity.Name)))
                {
                    var updatedManufacturerEntity = manufacturerRepository.Update(manufacturerEntity);
                    _unitOfWork.SaveChanges();

                    updatedManufacturerDTO = _mapper.Map<DTOManufacturer>(updatedManufacturerEntity);

                    return new DataResult<DTOManufacturer> { Errors = new List<ErrorDescriber>(), Target = updatedManufacturerDTO };
                }
                else
                {
                    return new DataResult<DTOManufacturer> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Manufacture Name") }, Target = updatedManufacturerDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteManufacturerAsync(int manufacturerId)
        {
            return Task.Run(() =>
            {
                if (!carRepository.ExistByCondition(x => x.ManufacturerId == manufacturerId))
                {
                    manufacturerRepository.Delete(manufacturerId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "thương hiệu xe");

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
