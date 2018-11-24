using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class CustomerExchangeMap : EntityTypeConfiguration<CustomerExchange>
    {
        public CustomerExchangeMap()
        {
            ToTable("gm_customer_exchange");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_ce_id").IsRequired();

            // Properties
            Property(x => x.CustomerId).HasColumnName("gm_customer_id").IsRequired().HasMaxLength(50);
            Property(x => x.CarId).HasColumnName("gm_car_id").HasMaxLength(50);
            Property(x => x.MaintenanceCount).HasColumnName("gm_ce_maintenancecount").IsRequired();
            Property(x => x.StartDate).HasColumnName("gm_ce_startdate").IsRequired();
            Property(x => x.Transferred).HasColumnName("gm_ce_transferred");
            Property(x => x.TransfereeId).HasColumnName("gm_ce_transfereeid").HasMaxLength(50);
            Property(x => x.Transferee).HasColumnName("gm_ce_transferee").HasMaxLength(200);
            Property(x => x.TransferDate).HasColumnName("gm_ce_transferdate");

            // Relationship
            HasRequired(x => x.Customer).WithMany().HasForeignKey(f => f.CustomerId);
            HasOptional(x => x.Car).WithMany().HasForeignKey(f => f.CarId);
            HasMany(x => x.Quotations).WithRequired(f => f.CustomerExchange).HasForeignKey(f => f.CustomerExchangeId);
        }
    }
}
