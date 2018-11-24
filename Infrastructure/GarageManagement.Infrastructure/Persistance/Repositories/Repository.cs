using System;
using System.Linq;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using System.Reflection;

namespace GarageManagement.Infrastructure.Persistance
{
    public class Repository<TEntity> : Disposable, IRepository<TEntity> where TEntity : class
    {
        protected DbContext dbContext;

        protected IDbSet<TEntity> dbSet
        {
            get { return dbContext.Set<TEntity>(); }
        }

        protected readonly object Locker = new object();

        public Repository(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public virtual bool Exist(object id)
        {
            var entity = dbSet.Find(id);
            return entity != null;
        }

        public virtual bool ExistByCondition(Expression<Func<TEntity, bool>> expression)
        {
            var isExisted = dbSet.Any(expression);
            return isExisted;
        }

        public virtual TEntity Identity<T>(Expression<Func<TEntity, T>> expression)
        {
            return dbSet.OrderByDescending(expression).FirstOrDefault();
        }

        public virtual TEntity Insert(TEntity entity)
        {
            return dbSet.Add(entity);
        }

        public virtual void InsertMultiple(IEnumerable<TEntity> entities)
        {
            dbContext.Configuration.AutoDetectChangesEnabled = false;
            foreach (var entity in entities)
                dbSet.Add(entity);
        }
        
        public virtual TEntity Update(TEntity entity)
        {
            dbSet.Attach(entity);
            dbContext.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public virtual void Delete(TEntity entity)
        {
            if (entity != null)
            {
                dbSet.Attach(entity);
                dbSet.Remove(entity);
            }
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            if (entityToDelete != null)
            {
                if (dbContext.Entry(entityToDelete).State == EntityState.Detached)
                    dbSet.Attach(entityToDelete);

                dbSet.Remove(entityToDelete);
            }
        }
        
        public virtual void Delete(Expression<Func<TEntity, bool>> filter)
        {
            IEnumerable<TEntity> objects = dbSet.Where(filter).AsEnumerable();
            foreach (TEntity obj in objects)
                dbSet.Remove(obj);
        }

        public virtual IEnumerable<TEntity> GetAll(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = dbSet;

            foreach (Expression<Func<TEntity, object>> include in includes)
                query = query.Include(include);

            if (orderBy != null)
                query = orderBy(query);

            return query.AsEnumerable();
        }

        public virtual List<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = dbSet;

            foreach (Expression<Func<TEntity, object>> include in includes)
                query = query.Include(include);

            if (filter != null)
                query = query.Where(filter);

            if (orderBy != null)
                query = orderBy(query);

            return query.ToList();
        }

        public virtual IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
                query = query.Where(filter);

            if (orderBy != null)
                query = orderBy(query);

            return query;
        }

        public virtual TEntity GetById(object id)
        {
            return dbSet.Find(id);
        }

        public virtual TEntity GetFirstOrDefault(Expression<Func<TEntity, bool>> filter = null, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = dbSet;

            foreach (Expression<Func<TEntity, object>> include in includes)
                query = query.Include(include);

            if (filter != null)
                return query.FirstOrDefault(filter);

            return query.FirstOrDefault();
        }

        public virtual IPagedListResult<TEntity> Search(SearchQuery<TEntity> searchQuery)
        {
            IQueryable<TEntity> sequence = dbSet;

            sequence = ManageFilters(searchQuery, sequence);
            sequence = ManageIncludeProperties(searchQuery, sequence);
            sequence = ManageSubQueries(searchQuery, sequence);
            sequence = ManageSortCriterias(searchQuery, sequence);

            return GetPagingResult(searchQuery, sequence);
        }
        
        protected virtual IQueryable<TEntity> ManageFilters(SearchQuery<TEntity> searchQuery, IQueryable<TEntity> sequence)
        {
            if (searchQuery.Filters != null && searchQuery.Filters.Count > 0)
            {
                foreach (var filterClause in searchQuery.Filters)
                {
                    sequence = sequence.Where(filterClause);
                }
            }
            return sequence;
        }

        protected virtual IQueryable<TEntity> ManageIncludeProperties(SearchQuery<TEntity> searchQuery, IQueryable<TEntity> sequence)
        {
            if (!string.IsNullOrWhiteSpace(searchQuery.IncludeProperties))
            {
                var properties = searchQuery.IncludeProperties.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var includeProperty in properties)
                {
                    sequence = sequence.Include(includeProperty);
                }
            }
            return sequence;
        }

        protected virtual IQueryable<TEntity> ManageSortCriterias(SearchQuery<TEntity> searchQuery, IQueryable<TEntity> sequence)
        {
            if (searchQuery.SortCriterias != null && searchQuery.SortCriterias.Count > 0)
            {
                var sortCriteria = searchQuery.SortCriterias[0];
                var orderedSequence = sortCriteria.ApplyOrdering(sequence, false);

                if (searchQuery.SortCriterias.Count > 1)
                {
                    for (var i = 1; i < searchQuery.SortCriterias.Count; i++)
                    {
                        var sc = searchQuery.SortCriterias[i];
                        orderedSequence = sc.ApplyOrdering(orderedSequence, true);
                    }
                }
                sequence = orderedSequence;
            }
            else
            {
                sequence = ((IOrderedQueryable<TEntity>)sequence).OrderBy(x => (true));
            }
            return sequence;
        }

        protected virtual IQueryable<TEntity> ManageSubQueries(SearchQuery<TEntity> searchQuery, IQueryable<TEntity> sequence)
        {
            if (searchQuery.SubqueryCondition != null)
            {
                sequence = sequence.Where(searchQuery.SubqueryCondition);
            }
            return sequence;
        }

        protected virtual IPagedListResult<TEntity> GetPagingResult(SearchQuery<TEntity> searchQuery, IQueryable<TEntity> sequence)
        {
            //Counting the total number of object.
            var resultCount = sequence.Count();

            var result = (searchQuery.Take > 0)
                                ? (sequence.Skip(searchQuery.Skip).Take(searchQuery.Take).ToList())
                                : (sequence.ToList());

            //Debug info of what the query looks like
            //Console.WriteLine(sequence.ToString());

            // Setting up the return object.
            bool hasNext = (searchQuery.Skip <= 0 && searchQuery.Take <= 0) ? false : (searchQuery.Skip + searchQuery.Take < resultCount);
            return new PagedListResult<TEntity>()
            {
                DTOs = result,
                HasNext = hasNext,
                HasPrevious = (searchQuery.Skip > 0),
                CurrentPage = searchQuery.CurrentPage,
                TotalRows = resultCount,
                TotalPages = resultCount > 0 ? (int)Math.Ceiling(resultCount / (double)searchQuery.Take) : 0
            };
        }
    }
}
