using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class InventoryMap : EntityTypeConfiguration<Inventory>
    {
        public InventoryMap()
        {
            ToTable("gm_inventory");
            
            // Primary key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_inventory_id").IsRequired();

            // Properties
            Property(x => x.InputQuantity).HasColumnName("gm_inventory_input_quantity").IsRequired();
            Property(x => x.InputDate).HasColumnName("gm_inventory_input_date").IsRequired();
            Property(x => x.OutputQuantity).HasColumnName("gm_inventory_output_quantity").IsRequired();
            Property(x => x.OutputDate).HasColumnName("gm_inventory_output_date").IsRequired();
            Property(x => x.Deduction).HasColumnName("gm_inventory_deduction").IsRequired();
            Property(x => x.NeededQuantity).HasColumnName("gm_inventory_needed_quantity");

            // Foreign Key
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired();
            Property(x => x.AccessaryId).HasColumnName("gm_accessary_id").IsRequired();
            Property(x => x.StatusId).HasColumnName("gm_inventory_status_id").IsRequired();

            // Relationship
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            HasRequired(x => x.Accessary).WithMany().HasForeignKey(f => f.AccessaryId);
            HasRequired(x => x.InventoryStatus).WithMany().HasForeignKey(f => f.StatusId);
        }
    }
}
