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
    public class CategoryBusinessService : ServiceBase<GarageDbContext>, ICategoryBusinessService
    {
        private readonly IRepository<Category> _categoryRepository;

        public CategoryBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _categoryRepository = base.unitOfWork.GetRepository<Category>();
        }

        public Task<DataResult<List<DTOCategory>>> GetAllAsync()
        {
            return Task.Run(() =>
            {
                var categories = _categoryRepository.GetAll().ToList();
                categories.Add(new Category { Id = 0, Name = "Chọn danh mục" });

                var result = new DataResult<List<DTOCategory>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = mapper.Map<List<DTOCategory>>(categories.ToList())
                };

                return result;
            });
        }

        public Task<DataResult<List<DTOCategory>>> GetParentCategoriesAsync()
        {
            return Task.Run(() =>
            {
                var categories = _categoryRepository.Get(x => x.ParentId == null).ToList();
                categories.Add(new Category { Id = 0, Name = "Chọn danh mục" });

                var categoriesDTO = mapper.Map<List<DTOCategory>>(categories.ToList());

                return new DataResult<List<DTOCategory>> { Errors = new List<ErrorDescriber>(), Target = categoriesDTO };
            });
        }

        public Task<DataResult<DTOCategory>> GetCategoryByIdAsync(int id)
        {
            return Task.Run(() =>
            {
                var categoryDTO = new DTOCategory();

                var category = _categoryRepository.GetFirstOrDefault(x => x.Id == id, i => i.Parent);
                if (category != null)
                {
                    categoryDTO = mapper.Map<DTOCategory>(category);
                }

                return new DataResult<DTOCategory> { Errors = new List<ErrorDescriber>(), Target = categoryDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOCategory>>> GetCategoriesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                           CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Category>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;

                var sort = new FieldSortCriteria<Category>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm));

                var pagedCategories = _categoryRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOCategory>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOCategory, Category>(mapper, pagedCategories)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOCategory>> CreateCategoryAsync(DTOCategory categoryDTO)
        {
            return Task.Run(() =>
            {
                var createdCategoryDTO = new DTOCategory();
                var categoryEntity = mapper.Map<Category>(categoryDTO);

                if (!_categoryRepository.ExistByCondition(x => x.Name == categoryEntity.Name))
                {
                    categoryEntity.ParentId = categoryEntity.ParentId > 0 ? categoryEntity.ParentId : null;
                    var createdCategoryEntity = _categoryRepository.Insert(categoryEntity);
                    unitOfWork.SaveChanges();

                    createdCategoryDTO = mapper.Map<DTOCategory>(createdCategoryEntity);
                }

                return new DataResult<DTOCategory> { Errors = new List<ErrorDescriber>(), Target = createdCategoryDTO };
            });
        }

        public Task<DataResult<DTOCategory>> EditCategoryAsync(DTOCategory categoryDTO)
        {
            return Task.Run(() =>
            {
                var categoryEntity = mapper.Map<Category>(categoryDTO);
                var updatedCategoryDTO = new DTOCategory();

                if ((_categoryRepository.ExistByCondition(x => (x.Name == categoryEntity.Name && x.Id == categoryEntity.Id))) || (!_categoryRepository.ExistByCondition(x => x.Name == categoryEntity.Name)))
                {
                    var updatedCategoryEntity = _categoryRepository.Update(categoryEntity);
                    unitOfWork.SaveChanges();

                    updatedCategoryDTO = mapper.Map<DTOCategory>(updatedCategoryEntity);

                    return new DataResult<DTOCategory> { Errors = new List<ErrorDescriber>(), Target = updatedCategoryDTO };
                }
                else
                {
                    return new DataResult<DTOCategory> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Category Name") }, Target = updatedCategoryDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteCategoryAsync(int categoryId)
        {
            return Task.Run(() =>
            {
                if (!_categoryRepository.ExistByCondition(x => x.ParentId == categoryId))
                {
                    _categoryRepository.Delete(categoryId);
                    unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "danh mục");

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
