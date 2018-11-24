using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class EmployeeMap : EntityTypeConfiguration<Employee>
    {
        public EmployeeMap()
        {
            ToTable("gm_employee");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_employee_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_employee_generate_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_employee_name").IsRequired().HasMaxLength(100);
            Property(x => x.Address).HasColumnName("gm_employee_address").IsRequired().HasMaxLength(200);
            Property(x => x.Province).HasColumnName("gm_employee_province").IsRequired().HasMaxLength(30);
            Property(x => x.District).HasColumnName("gm_employee_district").IsRequired().HasMaxLength(30);
            Property(x => x.Ward).HasColumnName("gm_employee_ward").IsRequired().HasMaxLength(30);
            Property(x => x.Birthday).HasColumnName("gm_employee_birthday");
            Property(x => x.Phone).HasColumnName("gm_employee_phone").IsRequired().HasMaxLength(20);
            Property(x => x.Email).HasColumnName("gm_employee_email").HasMaxLength(200);
            Property(x => x.IdentityCard).HasColumnName("gm_employee_identitycard").HasMaxLength(50);
            Property(x => x.Delete).HasColumnName("gm_employee_delete");
            Property(x => x.Enable).HasColumnName("gm_employee_enable");

            // Foreign Key
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired();

            // Relationship
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            HasMany(x => x.Users).WithRequired(f => f.Employee).HasForeignKey(f => f.EmployeeId);
        }
    }
}
