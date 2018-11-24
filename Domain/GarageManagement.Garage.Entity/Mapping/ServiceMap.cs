using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ServiceMap : EntityTypeConfiguration<Service>
    {
        public ServiceMap()
        {
            ToTable("gm_service");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_service_id").IsRequired();

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_service_generate_id").IsRequired(); 
            Property(x => x.Name).HasColumnName("gm_service_name").IsRequired().HasMaxLength(100);
            Property(x => x.Cost).HasColumnName("gm_service_cost").IsRequired();
            Property(x => x.Description).HasColumnName("gm_service_description").HasMaxLength(1000);

            // Foreign Key
            Property(x => x.ServiceTypeId).HasColumnName("gm_service_type_id").IsRequired();
            Property(x => x.UnitId).HasColumnName("gm_unit_id").IsRequired();
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired().HasMaxLength(50);

            // Relationship
            HasRequired(x => x.ServiceType).WithMany().HasForeignKey(f => f.ServiceTypeId);
            HasRequired(x => x.Unit).WithMany().HasForeignKey(f => f.UnitId);
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
        }
    }
}
