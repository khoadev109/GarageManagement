using System;
using System.Collections.Generic;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOEmployee : DTOBase
    {
        public DTOEmployee()
        {
            Branches = new List<DTOBranch>();
            Users = new List<DTOUser>();
        }

        public string Id { get; set; }
        public int GenerateId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Birthday { get; set; } = "";
        public string Phone { get; set; }
        public string Email { get; set; }
        public string IdentityCard { get; set; }
        public bool? Delete { get; set; }
        public bool? Enable { get; set; }

        public string BranchId { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;

        public List<DTOBranch> Branches { get; set; }
        public List<DTOUser> Users { get; set; }
    }
}
