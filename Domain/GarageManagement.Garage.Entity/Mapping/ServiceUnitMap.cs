using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ServiceUnitMap : EntityTypeConfiguration<ServiceUnit>
    {
        public ServiceUnitMap()
        {
            ToTable("gm_service_unit");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_su_id").IsRequired();

            //Properties
            Property(x => x.Name).HasColumnName("gm_su_name").IsRequired().HasMaxLength(50);
        }
    }
}
