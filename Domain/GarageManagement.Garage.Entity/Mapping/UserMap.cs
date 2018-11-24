using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("gm_user");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_user_id").IsRequired();

            // Properties
            Property(x => x.LoginName).HasColumnName("gm_user_loginname").IsRequired().HasMaxLength(100);
            Property(x => x.Password).HasColumnName("gm_user_password").IsRequired().HasMaxLength(50);
            Property(x => x.Email).HasColumnName("gm_user_email").HasMaxLength(200);
            Property(x => x.CreateDate).HasColumnName("gm_user_createdate").IsRequired();
            Property(x => x.ModifyDate).HasColumnName("gm_user_modifydate");
            Property(x => x.LoginDate).HasColumnName("gm_user_logindate");

            // Foreign Key
            Property(x => x.RoleId).HasColumnName("gm_role_id").IsRequired();
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired();
            Property(x => x.EmployeeId).HasColumnName("gm_employee_id").IsRequired();

            // Relationship
            HasRequired(x => x.Role).WithMany().HasForeignKey(f => f.RoleId);
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            HasRequired(x => x.Employee).WithMany().HasForeignKey(f => f.EmployeeId);
        }
    }
}
