using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace GarageManagement.RepositoryInterface
{
    public interface IUnitOfWork<TContext> : IDisposable  where TContext : DbContext
    {
        TContext DbContext { get; }

        int SaveChanges();

        Task<int> SaveChangesAsync();

        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
    }
}
