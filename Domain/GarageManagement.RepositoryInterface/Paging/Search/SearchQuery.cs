using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace GarageManagement.RepositoryInterface.Paging
{
    public class SearchQuery<TEntity>
    {
        public int Skip { get; set; }

        public int Take { get; set; }

        public int CurrentPage { get; set; }

        public string IncludeProperties { get; set; }

        public List<ISortCriteria<TEntity>> SortCriterias { get; protected set; }

        public List<Expression<Func<TEntity, bool>>> Filters { get; protected set; }

        public Expression<Func<TEntity, bool>> SubqueryCondition { get; set; }

        public SearchQuery()
        {
            Filters = new List<Expression<Func<TEntity, bool>>>();
            SortCriterias = new List<ISortCriteria<TEntity>>();
        }

        public void AddFilter(Expression<Func<TEntity, Boolean>> filter)
        {
            Filters.Add(filter);
        }

        public void AddSortCriteria(ISortCriteria<TEntity> sortCriteria)
        {
            SortCriterias.Add(sortCriteria);
        }
    }
}
