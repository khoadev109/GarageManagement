using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class YearMap : EntityTypeConfiguration<Year>
    {
        public YearMap()
        {
            ToTable("gm_year");

            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_year_id").IsRequired();

            Property(x => x.ModelId).HasColumnName("gm_model_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_year_name").HasMaxLength(10);

            //relationship
            HasRequired(x => x.Model).WithMany().HasForeignKey(f => f.ModelId);
        }
    }
}
