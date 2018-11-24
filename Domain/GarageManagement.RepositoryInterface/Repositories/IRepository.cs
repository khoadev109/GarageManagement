using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface.Paging;

namespace GarageManagement.RepositoryInterface
{
    public interface IRepository<TEntity> where TEntity : class
    {
        bool Exist(object id);

        bool ExistByCondition(Expression<Func<TEntity, bool>> expression);

        TEntity Identity<T>(Expression<Func<TEntity, T>> expression);

        TEntity Insert(TEntity entity);

        void InsertMultiple(IEnumerable<TEntity> entities);

        TEntity Update(TEntity entity);

        void Delete(TEntity entity);

        void Delete(object id);

        void Delete(Expression<Func<TEntity, bool>> filter);

        IEnumerable<TEntity> GetAll(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, params Expression<Func<TEntity, object>>[] includes);

        List<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, params Expression<Func<TEntity, object>>[] includes);

        IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null);

        TEntity GetById(object id);

        TEntity GetFirstOrDefault(Expression<Func<TEntity, bool>> filter = null, params Expression<Func<TEntity, object>>[] includes);

        IPagedListResult<TEntity> Search(SearchQuery<TEntity> searchQuery);
    }
}
