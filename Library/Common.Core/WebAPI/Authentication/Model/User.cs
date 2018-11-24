using Microsoft.AspNet.Identity.EntityFramework;

namespace Common.Core.WebAPI.Authentication
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
