
namespace GarageManagement.Garage.Entity.Entities
{
    public class GarageSetting : BaseEntity
    {
        public bool SmsPhonenumber { get; set; }
        public bool EmailSchedule { get; set; }
        public int GarageId { get; set; }

        public virtual GarageInfo Garage { get; set; }
    }
}
