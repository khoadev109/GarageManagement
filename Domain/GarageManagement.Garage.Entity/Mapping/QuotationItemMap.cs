using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class QuotationItemMap : EntityTypeConfiguration<QuotationItem>
    {
        public QuotationItemMap()
        {
            ToTable("gm_quotation_item");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_qi_id").IsRequired();

            // Properties
            Property(x => x.Quantity).HasColumnName("gm_qi_quantity").IsRequired();
            Property(x => x.Duration).HasColumnName("gm_qi_duration");
            Property(x => x.TotalPrice).HasColumnName("gm_qi_totalprice").IsRequired();
            Property(x => x.TotalPriceText).HasColumnName("gm_qi_totalprice_text").HasMaxLength(150);
            Property(x => x.Discount).HasColumnName("gm_qi_discount");
            Property(x => x.FinalPrice).HasColumnName("gm_qi_finalprice").IsRequired();
            Property(x => x.VAT).HasColumnName("gm_qi_vat").IsRequired();

            // Foreign Key
            Property(x => x.QuotationId).HasColumnName("gm_quotationid").HasMaxLength(50).IsRequired();
            Property(x => x.AccessaryId).HasColumnName("gm_accessaryid").HasMaxLength(50);
            Property(x => x.ServiceId).HasColumnName("gm_serviceid").HasMaxLength(50);
            Property(x => x.EmployeeId).HasColumnName("gm_employeeid").HasMaxLength(50);
            Property(x => x.UnitId).HasColumnName("gm_unitid");

            // Relationship
            HasRequired(x => x.Quotation).WithMany(p => p.Items).HasForeignKey(f => f.QuotationId);
            HasOptional(x => x.Accessary).WithMany().HasForeignKey(f => f.AccessaryId);
            HasOptional(x => x.Service).WithMany().HasForeignKey(f => f.ServiceId);
            HasOptional(x => x.Employee).WithMany().HasForeignKey(f => f.EmployeeId);
            HasOptional(x => x.AccessaryUnit).WithMany().HasForeignKey(f => f.UnitId);
            HasOptional(x => x.ServiceUnit).WithMany().HasForeignKey(f => f.UnitId);
        }
    }
}
