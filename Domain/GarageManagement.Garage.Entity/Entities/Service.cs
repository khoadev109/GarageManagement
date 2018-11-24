using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Service : BaseEntity<string>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public string Description { get; set; }

        public int ServiceTypeId { get; set; }
        public int UnitId { get; set; }
        public string BranchId { get; set; }

        public virtual ServiceType ServiceType { get; set; }
        public virtual ServiceUnit Unit { get; set; }
        public virtual Branch Branch { get; set; }
    }
}
