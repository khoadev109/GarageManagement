using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ManufactureMap : EntityTypeConfiguration<Manufacturer>
    {
        public ManufactureMap()
        {
            ToTable("gm_manufacturer");

            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_mf_id").IsRequired();

            Property(x => x.Name).HasColumnName("gm_mf_name").IsRequired().HasMaxLength(100);
            Property(x => x.Description).HasColumnName("gm_mf_description").HasMaxLength(500);            
        }
    }
}
