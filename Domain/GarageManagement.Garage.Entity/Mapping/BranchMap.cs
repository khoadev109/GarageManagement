using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class BranchMap : EntityTypeConfiguration<Branch>
    {
        public BranchMap()
        {
            ToTable("gm_branch");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_branch_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_branch_generate_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_branch_name").IsRequired().HasMaxLength(200);
            Property(x => x.ShortName).HasColumnName("gm_branch_shortname").IsRequired().HasMaxLength(150);
            Property(x => x.Phone).HasColumnName("gm_branch_phone").HasMaxLength(20);
            Property(x => x.Email).HasColumnName("gm_branch_email").HasMaxLength(200);
            Property(x => x.Address).HasColumnName("gm_branch_address").HasMaxLength(200);
            Property(x => x.Province).HasColumnName("gm_branch_province").HasMaxLength(50);
            Property(x => x.District).HasColumnName("gm_branch_district").HasMaxLength(50);
            Property(x => x.Ward).HasColumnName("gm_branch_ward").HasMaxLength(50);
        }
    }
}
