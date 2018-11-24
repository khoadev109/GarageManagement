using System.Data.Entity;

namespace GarageManagement.RepositoryInterface.Paging
{
    public interface IFilter<T> where T : DbContext
    {
        void Apply();
        T DbContext { get; set; }
    }
}
