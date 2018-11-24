using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class GarageLayoutMap : EntityTypeConfiguration<GarageLayout>
    {
        public GarageLayoutMap()
        {
            ToTable("gm_layout");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_layout_id").IsRequired();

            // Properties
            Property(x => x.Title).HasColumnName("gm_layout_title").HasMaxLength(128);
            Property(x => x.Logo).HasColumnName("gm_layout_logo").HasMaxLength(100);
            Property(x => x.Color).HasColumnName("gm_layout_color").HasMaxLength(10);
            Property(x => x.Font).HasColumnName("gm_layout_font").HasMaxLength(50);
            Property(x => x.Theme).HasColumnName("gm_layout_theme").HasMaxLength(128);
            Property(x => x.LicenseFormat).HasColumnName("gm_layout_license_format").HasMaxLength(128);
            Property(x => x.Status).HasColumnName("gm_layout_status").IsRequired();

            // Foreign Key
            Property(x => x.GarageId).HasColumnName("gm_garage_id");

            // Relationship
            HasRequired(x => x.Garage).WithMany().HasForeignKey(f => f.GarageId);
        }
    }
}
