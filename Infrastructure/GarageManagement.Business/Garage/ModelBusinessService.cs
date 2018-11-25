using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
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
    public class ModelBusinessService : ServiceBase<GarageDbContext>, IModelBusinessService
    {
        private readonly IRepository<Model> _modelRepository;
        private readonly IRepository<Car> _carRepository;

        public ModelBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            base.mapper = mapper;
            _modelRepository = base.unitOfWork.GetRepository<Model>();
            _carRepository = base.unitOfWork.GetRepository<Car>();
        }

        public Task<DataResult<List<DTOModel>>> GetModelsByManufacturerAsync(int manufacturerId)
        {
            return Task.Run(() =>
            {

                Expression<Func<Model, object>>[] modelIncludes = { x => x.Style, x => x.Manufacturer };

                var models = _modelRepository.Get(x => x.ManufacturerId == manufacturerId, includes: modelIncludes).ToList();

                var modelsDto = mapper.Map<List<DTOModel>>(models);

                return new DataResult<List<DTOModel>> { Errors = new List<ErrorDescriber>(), Target = modelsDto };
            });
        }

        public Task<DataResult<List<DTOModel>>> GetAllModelsAsync()
        {
            return Task.Run(() =>
            {
                var models = _modelRepository.GetAll().ToList();

                var modelsDTO = mapper.Map<List<DTOModel>>(models);

                return new DataResult<List<DTOModel>> { Errors = new List<ErrorDescriber>(), Target = modelsDTO };
            });
        }

        public Task<DataResult<DTOModel>> GetModelByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var modelDTO = new DTOModel();
                var service = _modelRepository.GetById(id);

                if (service != null)
                {
                    modelDTO = mapper.Map<DTOModel>(service);
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

                var pagedModels = _modelRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOModel>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOModel, Model>(mapper, pagedModels)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOModel>> CreateModelAsync(DTOModel modelDTO)
        {
            return Task.Run(() =>
            {
                var createdServiceDTO = new DTOModel();
                var modelEntity = mapper.Map<Model>(modelDTO);

                if (!_modelRepository.ExistByCondition(x => x.Name == modelEntity.Name))
                {
                    var createdServiceEntity = _modelRepository.Insert(modelEntity);
                    unitOfWork.SaveChanges();

                    createdServiceDTO = mapper.Map<DTOModel>(createdServiceEntity);
                }

                return new DataResult<DTOModel> { Errors = new List<ErrorDescriber>(), Target = createdServiceDTO };
            });
        }

        public Task<DataResult<DTOModel>> EditModelAsync(DTOModel modelDTO)
        {
            return Task.Run(() =>
            {
                var modelEntity = mapper.Map<Model>(modelDTO);
                var updatedModelDTO = new DTOModel();

                if ((_modelRepository.ExistByCondition(x => (x.Name == modelEntity.Name && x.Id == modelEntity.Id))) || (!_modelRepository.ExistByCondition(x => x.Name == modelEntity.Name)))
                {
                    var updatedModelEntity = _modelRepository.Update(modelEntity);
                    unitOfWork.SaveChanges();

                    updatedModelDTO = mapper.Map<DTOModel>(updatedModelEntity);

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
                if (!_carRepository.ExistByCondition(x => x.ModelId == modelId))
                {
                    _modelRepository.Delete(modelId);
                    unitOfWork.SaveChanges();

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
