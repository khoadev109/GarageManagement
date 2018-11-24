using System.Collections.Generic;

namespace GarageManagement.RepositoryInterface.Paging
{
    public interface IPagedListResult<TEntity>
    {
        bool HasNext { get; set; }
        bool HasPrevious { get; set; }
        int CurrentPage { get; set; }
        long TotalRows { get; set; }
        int TotalPages { get; set; }
        IEnumerable<TEntity> DTOs { get; set; }
    }
}
