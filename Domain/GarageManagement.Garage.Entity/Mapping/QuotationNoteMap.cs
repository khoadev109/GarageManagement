using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class QuotationNoteMap : EntityTypeConfiguration<QuotationNote>
    {
        public QuotationNoteMap()
        {
            ToTable("gm_quotation_note");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_qn_id").IsRequired();

            // Properties
            Property(x => x.Note).HasColumnName("gm_qn_note").IsRequired(); 
            Property(x => x.QuotationId).HasColumnName("gm_quotation_id").IsRequired().HasMaxLength(50);
            Property(x => x.StatusId).HasColumnName("gm_quotation_statusid").IsRequired();

            // Relationship
            HasRequired(x => x.Quotation).WithMany().HasForeignKey(f => f.QuotationId);
            HasRequired(x => x.Status).WithMany().HasForeignKey(f => f.StatusId);
        }
    }
}
