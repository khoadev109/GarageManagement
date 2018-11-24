using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IRightHandlerBusinessService
    {
        bool CheckPermissionOfUser(int user_id, int? role_id, int mod_id, int act_value);
    }
}
