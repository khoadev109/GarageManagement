using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Car : BaseEntity<string>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string ManufacturerName { get; set; }
        public string StyleName { get; set; }
        public string ModelName { get; set; }
        public string YearName { get; set; }
        public string Color { get; set; }
        public string VinNumber { get; set; }
        public string MachineNumber { get; set; }
        public string LicensePlates { get; set; }
        public long? Km { get; set; }
        public Nullable<DateTime> CreatedDate { get; set; }
        public Nullable<DateTime> ModifiedDate { get; set; }

        public string BranchId { get; set; }
        public int ManufacturerId { get; set; }
        public int StyleId { get; set; }
        public int ModelId { get; set; }
        public int YearId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual Manufacturer Manufacturer { get; set; }
        public virtual Style Style { get; set; }
        public virtual Model Model { get; set; }
        public virtual Year Year { get; set; }
    }
}
