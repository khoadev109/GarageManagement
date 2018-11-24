using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class QuotationStatusMap : EntityTypeConfiguration<QuotationStatus>
    {
        public QuotationStatusMap()
        {
            ToTable("gm_quotation_status");

            //Primary key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_qs_id").IsRequired();

            //Properties
            Property(x => x.Name).HasColumnName("gm_qs_name").IsRequired();            
        }
    }
}
