using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class CustomerTypeMap : EntityTypeConfiguration<CustomerType>
    {
        public CustomerTypeMap()
        {
            ToTable("gm_customer_type");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_ct_id").IsRequired();

            // Properties
            Property(x => x.Name).HasColumnName("gm_ct_name").IsRequired().HasMaxLength(100);
            Property(x => x.Description).HasColumnName("gm_ct_description").HasMaxLength(500);
        }
    }
}
