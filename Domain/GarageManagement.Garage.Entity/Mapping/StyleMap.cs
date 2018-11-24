using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class StyleMap : EntityTypeConfiguration<Style>
    {
        public StyleMap()
        {
            ToTable("gm_style");

            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_style_id").IsRequired();

            Property(x => x.Name).HasColumnName("gm_style_name").IsRequired().HasMaxLength(100);
            Property(x => x.Description).HasColumnName("gm_style_description").HasMaxLength(500);

            Property(x => x.ManufacturerId).HasColumnName("gm_manufacturer_id").IsRequired();

            //relationship
            HasRequired(x => x.Manufacturer).WithMany().HasForeignKey(f => f.ManufacturerId);
        }
    }
}
