using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;

namespace GarageManagement.Infrastructure.Persistance
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
    {
        private bool disposed = false;
        private readonly TContext _context;
        private Dictionary<Type, object> repositories;

        public UnitOfWork(TContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public TContext DbContext => _context;

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (repositories == null)
                repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!repositories.ContainsKey(type))
                repositories[type] = new Repository<TEntity>(_context);

            return repositories[type] as IRepository<TEntity>;
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    // clear repositories
                    if (repositories != null)
                        repositories.Clear();

                    // dispose the db context.
                    _context.Dispose();
                }
            }

            disposed = true;
        }
    }
}
