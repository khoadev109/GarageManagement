using GarageManagement.Garage.Entity.Entities;
using System.Data.Entity.ModelConfiguration;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class CarMap : EntityTypeConfiguration<Car>
    {
        public CarMap()
        {
            ToTable("gm_car");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_car_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_car_generate_id").IsRequired();
            Property(x => x.ManufacturerName).HasColumnName("gm_manufacturer_name").HasMaxLength(100);
            Property(x => x.StyleName).HasColumnName("gm_style_name").HasMaxLength(100);
            Property(x => x.ModelName).HasColumnName("gm_model_name").HasMaxLength(100);
            Property(x => x.YearName).HasColumnName("gm_year_name").HasMaxLength(10);
            Property(x => x.Color).HasColumnName("gm_car_color").HasMaxLength(20);
            Property(x => x.VinNumber).HasColumnName("gm_car_vinnumber").HasMaxLength(50);
            Property(x => x.MachineNumber).HasColumnName("gm_car_machinenumber").HasMaxLength(50);
            Property(x => x.LicensePlates).HasColumnName("gm_car_license plates").IsRequired().HasMaxLength(50);
            Property(x => x.Km).HasColumnName("gm_car_km");
            Property(x => x.CreatedDate).HasColumnName("gm_car_createddate");
            Property(x => x.ModifiedDate).HasColumnName("gm_car_modifieddate");
            //

            // Foreign Key
            Property(x => x.BranchId).HasColumnName("gm_branch_id");
            Property(x => x.ManufacturerId).HasColumnName("gm_manufacturer_id");
            Property(x => x.StyleId).HasColumnName("gm_style_id");
            Property(x => x.ModelId).HasColumnName("gm_model_id");
            Property(x => x.YearId).HasColumnName("gm_year_id");

            // Relationship
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            //HasOptional(x => x.Manufacturer).WithMany().HasForeignKey(f => f.ManufacturerId);
            //HasOptional(x => x.Style).WithMany().HasForeignKey(f => f.StyleId);
            //HasOptional(x => x.Model).WithMany().HasForeignKey(f => f.ModelId);
            //HasOptional(x => x.Year).WithMany().HasForeignKey(f => f.YearId);
        }
    }
}
