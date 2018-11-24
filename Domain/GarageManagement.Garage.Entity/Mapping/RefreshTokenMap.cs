using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class RefreshTokenMap : EntityTypeConfiguration<RefreshToken>
    {
        public RefreshTokenMap()
        {
            ToTable("gm_refresh_token");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_rt_id").IsRequired();

            // Properties
            Property(x => x.Token).HasColumnName("gm_rt_token").IsRequired().HasMaxLength(1000);
            Property(x => x.IssuedUtc).HasColumnName("gm_rt_issued_utc").IsRequired();
            Property(x => x.ExpiresUtc).HasColumnName("gm_rt_expires_utc").IsRequired();
            Property(x => x.ProtectedTicket).HasColumnName("gm_rt_protected_ticket").IsRequired().HasMaxLength(1000);
            
            // Foreign Key
            Property(x => x.UserId).HasColumnName("gm_user_id").IsRequired();
            
            // Relationship
            HasRequired(x => x.User).WithMany().HasForeignKey(f => f.UserId);
        }
    }
}
