using NHibernate;
using NHibernate.Criterion;
using System.Collections.Generic;

namespace Vienauto.Core.Data.Paging
{
    public class PagingExtension
    {
        /// <summary>
        /// Based on the ICriteria will return a paged result set, will create two copies
        /// of the query 1 will be used to select the total count of items, the other
        /// used to select the page of data.
        ///
        /// The results will be wraped in a PagedResult object which will contain
        /// the items and total item count.
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="criteria"></param>
        /// <param name="startIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public static PagedResult<TEntity> ToPagedResult<TEntity>(this ICriteria criteria, int startIndex, int pageSize)
        {

            // Clone a copy of the criteria, setting a projection
            // to get the row count, this will get the total number of
            // items in the query using a select count(*)
            ICriteria countCriteria = CriteriaTransformer.Clone(criteria)
                .SetProjection(Projections.RowCountInt64());

            // Clear the ordering of the results
            countCriteria.Orders.Clear();

            // Clone a copy fo the criteria to get the page of data,
            // setting max and first result, this will get the page of data.s
            ICriteria pageCriteria = CriteriaTransformer.Clone(criteria)
                    .SetMaxResults(pageSize)
                    .SetFirstResult(startIndex);

            // Create a new pagedresult object and populate it, use the paged query
            // to get the items, and the count query to get the total item count.
            var pagedResult = new PagedResult<TEntity>(pageCriteria.List<TEntity>(),
                                                       (long)countCriteria.UniqueResult());

            // Return the result.
            return pagedResult;
        }
    }

    /// <summary>
    /// A paged result set, will have the items in the page of data
    /// and a total item count for the total number of results.
    /// </summary>
    public class PagedResult<TEntity>
    {

        #region Properties

        /// <summary>
        /// The items for the current page.
        /// </summary>
        public IList<TEntity> Items { get; protected set; }

        /// <summary>
        /// Gets the total count of items.
        /// </summary>
        public long TotalItems { get; set; }

        #endregion

        #region Constructor

        /// <summary>
        /// Initialise an instance of the paged result, 
        /// intiailise the internal collection.
        /// </summary>
        public PagedResult()
        {
            this.Items = new List<TEntity>();
        }

        /// <summary>
        /// Initialise our page result, set the items and the current page + total count
        /// </summary>
        /// <param name="items"></param>
        /// <param name="totalItems"></param>
        public PagedResult(IList<TEntity> items, long totalItems)
        {
            Items = items;
            TotalItems = totalItems;
        }

        #endregion
    }

    //PagedResult<Person> pagedResult = criteria.ToPagedResult<Person>(0, 10);
}
