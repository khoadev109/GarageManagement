using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class GarageSettingMap : EntityTypeConfiguration<GarageSetting>
    {
        public GarageSettingMap()
        {
            ToTable("gm_garage_setting");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_setting_id").IsRequired();

            // Properties
            Property(x => x.SmsPhonenumber).HasColumnName("gm_setting_sms_phonenumber");
            Property(x => x.EmailSchedule).HasColumnName("gm_setting_email_schedule");

            // Foreign Key
            Property(x => x.GarageId).HasColumnName("gm_garage_id").IsRequired();

            // Relationship
            HasRequired(x => x.Garage).WithMany().HasForeignKey(f => f.GarageId);
        }
    }
}
