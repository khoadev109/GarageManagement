using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class ReceiptsBillMap : EntityTypeConfiguration<ReceiptsBill>
    {
        public ReceiptsBillMap()
        {
            ToTable("gm_receipts_bill");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_receipts_id").IsRequired();

            // Properties
            Property(x => x.Payer).HasColumnName("gm_receipts_payer").HasMaxLength(100).IsRequired();
            Property(x => x.Money).HasColumnName("gm_receipts_money").IsRequired();
            Property(x => x.MoneyText).HasColumnName("gm_receipts_moneytext").HasMaxLength(150).IsRequired();
            Property(x => x.Content).HasColumnName("gm_receipts_content").IsRequired();
            Property(x => x.Attach).HasColumnName("gm_receipts_attach");
            Property(x => x.CreateDate).HasColumnName("gm_receipts_createdate");
            Property(x => x.ModifiedDate).HasColumnName("gm_receipts_modifieddate");

            // Foreign Key
            Property(x => x.QuotationId).HasColumnName("gm_quotation_id");
            
            // Relationship
            HasOptional(x => x.Quotation).WithMany().HasForeignKey(f => f.QuotationId);
        }
    }
}

