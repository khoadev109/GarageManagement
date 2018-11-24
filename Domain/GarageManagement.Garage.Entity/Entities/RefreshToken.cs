using System;

namespace GarageManagement.Garage.Entity.Entities
{
    public class RefreshToken : BaseEntity
    {
        public string Token { get; set; }
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }
        public string ProtectedTicket { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
