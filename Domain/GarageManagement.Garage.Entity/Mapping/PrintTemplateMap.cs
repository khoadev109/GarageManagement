using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class PrintTemplateMap : EntityTypeConfiguration<PrintTemplate>
    {
        public PrintTemplateMap()
        {
            ToTable("gm_print_template");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_pt_id").IsRequired();

            // Properties
            Property(x => x.Content).HasColumnName("gm_pt_content");
            Property(x => x.StatusId).HasColumnName("gm_pt_status_id");
        }
    }
}
