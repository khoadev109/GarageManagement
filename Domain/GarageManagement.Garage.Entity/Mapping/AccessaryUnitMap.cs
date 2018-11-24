using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class AccessaryUnitMap : EntityTypeConfiguration<AccessaryUnit>
    {
        public AccessaryUnitMap()
        {
            ToTable("gm_accessary_unit");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_au_id").IsRequired();

            //Properties
            Property(x => x.Name).HasColumnName("gm_au_name").IsRequired().HasMaxLength(50);
        }
    }
}
