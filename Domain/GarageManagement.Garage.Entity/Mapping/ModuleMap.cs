using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ModuleMap : EntityTypeConfiguration<Module>
    {
        public ModuleMap()
        {
            ToTable("gm_module");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_module_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_module_name").IsRequired().HasMaxLength(200);
            Property(x => x.Description).HasColumnName("gm_module_description").HasMaxLength(500);
        }
    }
}
