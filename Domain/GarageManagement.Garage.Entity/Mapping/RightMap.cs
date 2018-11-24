using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class RightMap : EntityTypeConfiguration<Right>
    {
        public RightMap()
        {
            ToTable("gm_right");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_right_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_right_name").IsRequired().HasMaxLength(250);
        }
    }
}
