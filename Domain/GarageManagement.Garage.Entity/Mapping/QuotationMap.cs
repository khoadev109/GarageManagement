using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class QuotationMap : EntityTypeConfiguration<Quotation>
    {
        public QuotationMap()
        {
            ToTable("gm_quotation");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_quotation_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_quotation_generate_id").IsRequired();
            Property(x => x.AdviserName).HasColumnName("gm_quotation_advisername").HasMaxLength(100);
            Property(x => x.EntryDate).HasColumnName("gm_quotation_entrydate");
            Property(x => x.StartDate).HasColumnName("gm_quotation_startdate");
            Property(x => x.ExpectedCompleteDate).HasColumnName("gm_quotation_expected_completedate");
            Property(x => x.CompleteDate).HasColumnName("gm_quotation_completedate");
            Property(x => x.ContactName).HasColumnName("gm_quotation_contactname").IsRequired().HasMaxLength(100);
            Property(x => x.ContactPhone).HasColumnName("gm_quotation_contactphone");
            Property(x => x.Note).HasColumnName("gm_quotation_note").HasMaxLength(500);
            Property(x => x.Tracking).HasColumnName("gm_quotation_tracking");
            Property(x => x.UpdateDate).HasColumnName("gm_quotation_updatedate");
            Property(x => x.NextKm).HasColumnName("gm_quotation_next_km");
            Property(x => x.NextMaintenanceDate).HasColumnName("gm_quotation_next_maintenancedate");

            // Foreign Key
            Property(x => x.BranchId).HasColumnName("gm_branch_id").IsRequired().HasMaxLength(50);
            Property(x => x.CustomerExchangeId).HasColumnName("gm_customer_exchange_id").IsRequired();
            Property(x => x.AdviserId).HasColumnName("gm_quotation_adviserid").HasMaxLength(50);
            Property(x => x.StatusId).HasColumnName("gm_quotation_statusid").IsRequired();

            // Relationship
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            HasOptional(x => x.Adviser).WithMany().HasForeignKey(f => f.AdviserId);
            HasRequired(x => x.Status).WithMany().HasForeignKey(f => f.StatusId);
            HasRequired(x => x.CustomerExchange).WithMany(f => f.Quotations).HasForeignKey(f => f.CustomerExchangeId);
            HasMany(x => x.Items).WithRequired(f => f.Quotation).HasForeignKey(f => f.QuotationId);
        }
    }
}
