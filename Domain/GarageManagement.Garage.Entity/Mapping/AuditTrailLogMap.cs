using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class AuditTrailLogMap : EntityTypeConfiguration<AuditTrailLog>
    {
        public AuditTrailLogMap()
        {
            ToTable("gm_audit_trail_log");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_adl_id").IsRequired();

            // Properties
            Property(x => x.Module).HasColumnName("gm_adl_module").IsRequired().HasMaxLength(150);
            Property(x => x.CreatedDate).HasColumnName("gm_adl_created_date").IsRequired();
            Property(x => x.CreatedBy).HasColumnName("gm_adl_created_by").IsRequired();
            Property(x => x.Action).HasColumnName("gm_adl_action").IsRequired();
            Property(x => x.OriginalValues).HasColumnName("gm_adl_original_values");
            Property(x => x.NewValues).HasColumnName("gm_adl_new_values");
        }
    }
}
