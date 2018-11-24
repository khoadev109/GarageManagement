using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class QuotationEmployeeMap : EntityTypeConfiguration<QuotationEmployee>
    {
        public QuotationEmployeeMap()
        {
            ToTable("gm_quotation_employee");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_qe_id").IsRequired();

            // Foreign Keys
            Property(x => x.EmployeeId).HasColumnName("gm_employeeid").IsRequired().HasMaxLength(50);
            Property(x => x.QuotationId).HasColumnName("gm_quotationid").HasMaxLength(50);

            // Relationship
            HasRequired(x => x.Employee).WithMany().HasForeignKey(f => f.EmployeeId);
            HasRequired(x => x.Quotation).WithMany().HasForeignKey(f => f.QuotationId);
        }
    }
}
