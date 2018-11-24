using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    class MaintenanceScheduleMap : EntityTypeConfiguration<MaintenanceSchedule>
    {
        public MaintenanceScheduleMap()
        {
            ToTable("gm_maintenance_schedule");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_ms_id").IsRequired();

            // Properties
            Property(x => x.QuotationId).HasColumnName("gm_quotation_id").IsRequired().HasMaxLength(50);
            Property(x => x.Km).HasColumnName("gm_ms_km").IsRequired();
            Property(x => x.Startdate).HasColumnName("gm_ms_startdate").IsRequired();
            Property(x => x.Status).HasColumnName("gm_ms_status").IsRequired().HasMaxLength(20);
            Property(x => x.RetryCount).HasColumnName("gm_ms_retrycount");

            //relationship
            HasRequired(x => x.Quotation).WithMany().HasForeignKey(f => f.QuotationId);
        }
    }
}
