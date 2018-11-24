using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ServiceTypeMap : EntityTypeConfiguration<ServiceType>
    {
        public ServiceTypeMap()
        {
            ToTable("gm_service_type");

            // Primary key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_st_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_st_name").IsRequired().HasMaxLength(100);
            Property(x => x.ParentId).HasColumnName("gm_st_parent_id");

            // Relationship
            HasOptional(x => x.Parent).WithMany(x => x.Children).HasForeignKey(f => f.ParentId);
            HasMany(x => x.Children).WithOptional(x => x.Parent).HasForeignKey(f => f.ParentId);
        }
    }
}
