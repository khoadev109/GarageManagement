using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
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
    public class ModelBusinessService : ServiceBase<GarageDbContext>, IModelBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Model> modelRepository;
        private readonly IRepository<Car> carRepository;

        public ModelBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            modelRepository = _unitOfWork.GetRepository<Model>();
            carRepository = _unitOfWork.GetRepository<Car>();
        }

        public Task<DataResult<List<DTOModel>>> GetModelsByManufacturerAsync(int manufacturerId)
        {
            return Task.Run(() =>
            {

                Expression<Func<Model, object>>[] modelIncludes = { x => x.Style, x => x.Manufacturer };

                var models = modelRepository.Get(x => x.ManufacturerId == manufacturerId, includes: modelIncludes).ToList();

                var modelsDto = _mapper.Map<List<DTOModel>>(models);

                return new DataResult<List<DTOModel>> { Errors = new List<ErrorDescriber>(), Target = modelsDto };
            });
        }

        public Task<DataResult<List<DTOModel>>> GetAllModelsAsync()
        {
            return Task.Run(() =>
            {
                var models = modelRepository.GetAll().ToList();

                var modelsDTO = _mapper.Map<List<DTOModel>>(models);

                return new DataResult<List<DTOModel>> { Errors = new List<ErrorDescriber>(), Target = modelsDTO };
            });
        }

        public Task<DataResult<DTOModel>> GetModelByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var modelDTO = new DTOModel();
                var service = modelRepository.GetById(id);

                if (service != null)
                {
                    modelDTO = _mapper.Map<DTOModel>(service);
                }

                return new DataResult<DTOModel> { Errors = new List<ErrorDescriber>(), Target = modelDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOModel>>> GetModelsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Model>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Style, Manufacturer";

                var sort = new FieldSortCriteria<Model>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || 
                                               x.Description.Contains(searchTerm) ||
                                               x.Manufacturer.Name.Contains(searchTerm) ||
                                               x.Style.Name.Contains(searchTerm));

                var pagedModels = modelRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOModel>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOModel, Model>(_mapper, pagedModels)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOModel>> CreateModelAsync(DTOModel modelDTO)
        {
            return Task.Run(() =>
            {
                var createdServiceDTO = new DTOModel();
                var modelEntity = _mapper.Map<Model>(modelDTO);

                if (!modelRepository.ExistByCondition(x => x.Name == modelEntity.Name))
                {
                    var createdServiceEntity = modelRepository.Insert(modelEntity);
                    _unitOfWork.SaveChanges();

                    createdServiceDTO = _mapper.Map<DTOModel>(createdServiceEntity);
                }

                return new DataResult<DTOModel> { Errors = new List<ErrorDescriber>(), Target = createdServiceDTO };
            });
        }

        public Task<DataResult<DTOModel>> EditModelAsync(DTOModel modelDTO)
        {
            return Task.Run(() =>
            {
                var modelEntity = _mapper.Map<Model>(modelDTO);
                var updatedModelDTO = new DTOModel();

                if ((modelRepository.ExistByCondition(x => (x.Name == modelEntity.Name && x.Id == modelEntity.Id))) || (!modelRepository.ExistByCondition(x => x.Name == modelEntity.Name)))
                {
                    var updatedModelEntity = modelRepository.Update(modelEntity);
                    _unitOfWork.SaveChanges();

                    updatedModelDTO = _mapper.Map<DTOModel>(updatedModelEntity);

                    return new DataResult<DTOModel> { Errors = new List<ErrorDescriber>(), Target = updatedModelDTO };
                }
                else
                {
                    return new DataResult<DTOModel> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Model Name") }, Target = updatedModelDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteModelAsync(int modelId)
        {
            return Task.Run(() =>
            {
                if (!carRepository.ExistByCondition(x => x.ModelId == modelId))
                {
                    modelRepository.Delete(modelId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "dòng xe");

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
