using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class GarageInfoMap : EntityTypeConfiguration<GarageInfo>
    {
        public GarageInfoMap()
        {
            ToTable("gm_garage_info");

            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_garage_id").IsRequired();

            Property(x => x.Website).HasColumnName("gm_garage_website").HasMaxLength(200);
            Property(x => x.ExpireDate).HasColumnName("gm_garage_expiredate");
            Property(x => x.Name).HasColumnName("gm_garage_name").IsRequired().HasMaxLength(200);
            Property(x => x.ShortName).HasColumnName("gm_garage_shortname").HasMaxLength(10);
            Property(x => x.Address).HasColumnName("gm_garage_address").IsRequired().HasMaxLength(300);
            Property(x => x.District).HasColumnName("gm_garage_district").IsRequired().HasMaxLength(30);
            Property(x => x.Ward).HasColumnName("gm_garage_ward").IsRequired().HasMaxLength(30);
            Property(x => x.Phone).HasColumnName("gm_garage_phone").IsRequired().HasMaxLength(10);
            Property(x => x.Logo).HasColumnName("gm_garage_logo");
        }
    }
}
