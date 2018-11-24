using System.Web.Http;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.WebAPI.Attributes;

namespace GarageManagement.Garage.WebAPI.Controllers
{
    [APIAuthorize]
    public class CategoryController : BaseController
    {
        public CategoryController(ICategoryBusinessService categoryService)
        {
            serviceBuilder.BuildCategoryService(categoryService);
            dependency = serviceBuilder.Dependency;
        }

        public async Task<IHttpActionResult> GetFilterCategoriesWithPaging(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.GetCategoriesWithPagingAsync(searchTerm, sortName, sortDirection, pageIndex, pageSize));
        }

        public async Task<IHttpActionResult> GetAllCategories()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.GetAllAsync());
        }

        public async Task<IHttpActionResult> GetParentCategories()
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.GetParentCategoriesAsync());
        }

        public async Task<IHttpActionResult> Get(int categoryId = 0)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.GetCategoryByIdAsync(categoryId));
        }

        public async Task<IHttpActionResult> Post([FromBody]DTOCategory categoryDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.CreateCategoryAsync(categoryDTO), false);
        }

        public async Task<IHttpActionResult> Put([FromBody]DTOCategory categoryDTO)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.EditCategoryAsync(categoryDTO), false);
        }

        public async Task<IHttpActionResult> Delete(int categoryId)
        {
            return await ExecuteServiceReturnDefaultHttpResult(() => dependency.CategoryService.DeleteCategoryAsync(categoryId), false);
        }
    }
}
