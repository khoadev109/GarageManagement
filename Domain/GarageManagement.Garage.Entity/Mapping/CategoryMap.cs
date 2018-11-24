using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class CategoryMap : EntityTypeConfiguration<Category>
    {
        public CategoryMap()
        {
            ToTable("gm_category");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_cat_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_cat_name").IsRequired().HasMaxLength(250);
            Property(x => x.ParentId).HasColumnName("gm_cat_parent_id");

            // Relationship
            HasOptional(x => x.Parent).WithMany(x => x.Children).HasForeignKey(f => f.ParentId);
            HasMany(x => x.Children).WithOptional(x => x.Parent).HasForeignKey(f => f.ParentId);
        }
    }
}
