using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class InventoryStatusMap : EntityTypeConfiguration<InventoryStatus>
    {
        public InventoryStatusMap()
        {
            ToTable("gm_inventory_status");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_it_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_it_name").IsRequired().HasMaxLength(50);
            Property(x => x.Description).HasColumnName("gm_it_description").HasMaxLength(1000);            
        }
    }
}
