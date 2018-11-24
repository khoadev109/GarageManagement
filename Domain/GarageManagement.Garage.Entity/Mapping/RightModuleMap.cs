using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class RightModuleMap : EntityTypeConfiguration<RightModule>
    {
        public RightModuleMap()
        {
            ToTable("gm_right_module");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_rm_id").IsRequired();

            // Foreign Key
            Property(x => x.RightId).HasColumnName("gm_right_id");
            Property(x => x.ModuleId).HasColumnName("gm_module_id");

            //Relationship
            HasRequired(x => x.Right).WithMany().HasForeignKey(f => f.RightId);
            HasRequired(x => x.Module).WithMany().HasForeignKey(f => f.ModuleId);
        }
    }
}
