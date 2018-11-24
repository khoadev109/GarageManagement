using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ModelMap : EntityTypeConfiguration<Model>
    {
        public ModelMap()
        {
            ToTable("gm_model");

            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_model_id").IsRequired();

            Property(x => x.StyleId).HasColumnName("gm_style_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_model_name").IsRequired().HasMaxLength(100);
            Property(x => x.Description).HasColumnName("gm_model_description").HasMaxLength(500);
            Property(x => x.ManufacturerId).HasColumnName("gm_manufacturer_id").IsRequired();

            //relationship
            HasRequired(x => x.Style).WithMany().HasForeignKey(f => f.StyleId);
            HasRequired(x => x.Manufacturer).WithMany().HasForeignKey(f => f.ManufacturerId);
        }
    }
}
