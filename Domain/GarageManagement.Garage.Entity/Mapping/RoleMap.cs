using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class RoleMap : EntityTypeConfiguration<Role>
    {
        public RoleMap()
        {
            ToTable("gm_role");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_role_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_role_name").IsRequired().HasMaxLength(250);
        }
    }
}
