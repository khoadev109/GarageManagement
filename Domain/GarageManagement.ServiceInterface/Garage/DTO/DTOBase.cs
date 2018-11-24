using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOBase
    {
        public string UserName { get; set; }
    }

    public class DTOPaging<T> : DTOBase where T : class
    {
        IPagedListResult<T> pagingResult { get; set; }
    }
}
