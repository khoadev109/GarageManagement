using System.Collections.Generic;

namespace GarageManagement.RepositoryInterface.Paging
{
    public class PagedListResult<TEntity> : IPagedListResult<TEntity>
    {
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
        public int CurrentPage { get; set; }
        public long TotalRows { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<TEntity> DTOs { get; set; }
    }
}
