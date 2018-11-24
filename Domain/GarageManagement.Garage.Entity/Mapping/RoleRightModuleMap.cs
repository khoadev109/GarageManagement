using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class RoleRightModuleMap : EntityTypeConfiguration<RoleRightModule>
    {
        public RoleRightModuleMap()
        {
            ToTable("gm_role_right_module");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_rrm_id").IsRequired();

            // Properties
            Property(x => x.Value).HasColumnName("gm_rrm_value").IsRequired();

            // Foreign Key
            Property(x => x.RoleId).HasColumnName("gm_role_id").IsOptional();
            Property(x => x.UserId).HasColumnName("gm_user_id").IsOptional();
            Property(x => x.ModuleId).HasColumnName("gm_module_id").IsRequired();

            // Relationship
            HasOptional(x => x.Role).WithMany().HasForeignKey(f => f.RoleId);
            HasOptional(x => x.User).WithMany().HasForeignKey(f => f.UserId);
            HasRequired(x => x.Module).WithMany().HasForeignKey(f => f.ModuleId);
        }
    }
}
