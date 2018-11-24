using System;
using System.Linq;
using System.Reflection;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace GarageManagement.Garage.Entity.Context
{
    public class GarageDbContext : DbContext
    {
        public GarageDbContext() : base()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<GarageDbContext>());

            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            // Configuration.AutoDetectChangesEnabled = false;
            // Configuration.ValidateOnSaveEnabled = false;
        }

        public IDbSet<GarageInfo> GarageInfos { get; set; }
        public IDbSet<GarageSetting> GarageSettings { get; set; }
        public IDbSet<GarageLayout> GarageLayouts { get; set; }
        public IDbSet<Manufacturer> Manufacturers { get; set; }
        public IDbSet<Style> Styles { get; set; }
        public IDbSet<Model> Models { get; set; }
        public IDbSet<Year> Years { get; set; }
        public IDbSet<Branch> Branches { get; set; }
        public IDbSet<CustomerType> CustomerTypes { get; set; }
        public IDbSet<Customer> Customers { get; set; }
        public IDbSet<Car> Cars { get; set; }
        public IDbSet<CustomerExchange> CustomerExchanges { get; set; }
        public IDbSet<Service> Services { get; set; }
        public IDbSet<ServiceType> ServiceTypes { get; set; }
        public IDbSet<Category> Categories { get; set; }
        public IDbSet<Accessary> Accessaries { get; set; }
        public IDbSet<Quotation> Quotations { get; set; }
        public IDbSet<Employee> Employees { get; set; }
        public IDbSet<User> Users { get; set; }
        public IDbSet<RefreshToken> RefreshTokens { get; set; }
        public IDbSet<Role> Roles { get; set; }
        public IDbSet<Entities.Module> Modules { get; set; }
        public IDbSet<Right> Rights { get; set; }
        public IDbSet<RightModule> RightModules { get; set; }
        public IDbSet<RoleRightModule> RoleRightModules { get; set; }
        public IDbSet<AuditTrailLog> AuditTrailLogs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            //Auto register mapping
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                                          .Where(type => !string.IsNullOrEmpty(type.Namespace))
                                          .Where(type => type.BaseType != null && type.BaseType.IsGenericType && 
                                                 type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));

            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
        }

        public static GarageDbContext Create()
        {
            return new GarageDbContext();
        }
    }
}
