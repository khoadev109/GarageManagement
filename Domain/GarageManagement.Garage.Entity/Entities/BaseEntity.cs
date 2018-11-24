using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class BaseEntity : BaseEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }
    }

    public abstract partial class BaseEntity<T>
    {
        //private DateTime? createdDate;

        //[DataType(DataType.DateTime)]
        //public DateTime CreatedDate
        //{
        //    get { return createdDate ?? DateTime.UtcNow; }
        //    set { createdDate = value; }
        //}

        //[DataType(DataType.DateTime)]
        //public DateTime? ModifiedDate { get; set; }

        //public string CreatedBy { get; set; }

        //public string ModifiedBy { get; set; }

        [Key]
        public virtual T Id { get; set; }

        public override bool Equals(object obj)
        {
            return Equals(obj as BaseEntity<T>);
        }

        private static bool IsTransient(BaseEntity<T> obj)
        {
            return obj != null && Equals(obj.Id, default(int));
        }

        private Type GetUnproxiedType()
        {
            return GetType();
        }

        public virtual bool Equals(BaseEntity<T> other)
        {
            if (other == null)
                return false;

            if (ReferenceEquals(this, other))
                return true;

            if (!IsTransient(this) && !IsTransient(other) && Equals(Id, other.Id))
            {
                var otherType = other.GetUnproxiedType();
                var thisType = GetUnproxiedType();
                return thisType.IsAssignableFrom(otherType) ||
                        otherType.IsAssignableFrom(thisType);
            }

            return false;
        }

        public override int GetHashCode()
        {
            if (Equals(Id, default(int)))
                return base.GetHashCode();
            return Id.GetHashCode();
        }

        public static bool operator ==(BaseEntity<T> x, BaseEntity<T> y)
        {
            return Equals(x, y);
        }

        public static bool operator !=(BaseEntity<T> x, BaseEntity<T> y)
        {
            return !(x == y);
        }
    }
}
