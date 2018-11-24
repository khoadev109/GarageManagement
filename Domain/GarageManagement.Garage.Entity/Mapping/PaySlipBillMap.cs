using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class PaySlipBillMap : EntityTypeConfiguration<PaySlipBill>
    {
        public PaySlipBillMap()
        {
            ToTable("gm_payslip_bill");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_payslip_id").IsRequired();

            // Properties
            Property(x => x.Receiver).HasColumnName("gm_payslip_receiver").HasMaxLength(100).IsRequired();
            Property(x => x.Money).HasColumnName("gm_payslip_money").IsRequired();
            Property(x => x.MoneyText).HasColumnName("gm_payslip_moneytext").HasMaxLength(150).IsRequired();
            Property(x => x.Content).HasColumnName("gm_payslip_content").IsRequired();
            Property(x => x.Attach).HasColumnName("gm_payslip_attach");
            Property(x => x.CreateDate).HasColumnName("gm_payslip_createdate");
            Property(x => x.ModifiedDate).HasColumnName("gm_payslip_modifieddate");

            // Foreign Key
            Property(x => x.QuotationId).HasColumnName("gm_quotation_id");

            // Relationship
            HasOptional(x => x.Quotation).WithMany().HasForeignKey(f => f.QuotationId);
        }
    }
}

