using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class InsuerMap : EntityTypeConfiguration<Insuer>
    {
        public InsuerMap()
        {
            ToTable("gm_insurer");

            //Primary key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_insurer_id").IsRequired().HasMaxLength(50);

            //Properties
            Property(x => x.Name).HasColumnName("gm_insurer_name").IsRequired().HasMaxLength(100);
            Property(x => x.Address).HasColumnName("gm_insurer_address").IsRequired().HasMaxLength(200);
            Property(x => x.Taxcode).HasColumnName("gm_insurer_taxcode");
            Property(x => x.Email).HasColumnName("gm_insurer_email").HasMaxLength(100);
            Property(x => x.Phone).HasColumnName("gm_insurer_phone").HasMaxLength(20);
            Property(x => x.Fax).HasColumnName("gm_insurer_fax").HasMaxLength(20);
            Property(x => x.Website).HasColumnName("gm_insurer_website").HasMaxLength(100);
            Property(x => x.Note).HasColumnName("gm_insurer_note").HasMaxLength(500);                        
        }
    }
}
