using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class AccessaryMap : EntityTypeConfiguration<Accessary>
    {
        public AccessaryMap()
        {
            ToTable("gm_accessary");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_accessary_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_accessary_generate_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_accessary_name").HasMaxLength(200);
            Property(x => x.Image).HasColumnName("gm_accessary_image").HasMaxLength(200);
            Property(x => x.BarCode).HasColumnName("gm_accessary_bar_code").HasMaxLength(50);
            Property(x => x.Price).HasColumnName("gm_accessary_price");
            Property(x => x.CostGoodSold).HasColumnName("gm_accessary_cost_goods_sold");
            Property(x => x.OutOfStock).HasColumnName("gm_accessary_out_of_stock");
            Property(x => x.Description).HasColumnName("gm_accessary_description");

            // Foreign Key
            Property(x => x.CategoryId).HasColumnName("gm_category_id");
            Property(x => x.UnitId).HasColumnName("gm_unit_id");
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired().HasMaxLength(50);

            // Relationship
            HasRequired(x => x.Category).WithMany().HasForeignKey(f => f.CategoryId);
            HasRequired(x => x.Unit).WithMany().HasForeignKey(f => f.UnitId);
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
        }
    }
}
