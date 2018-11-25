using System;
using System.Linq;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.RepositoryInterface;
using GarageManagement.ServiceInterface.Garage;

namespace GarageManagement.Business.Garage
{
    public class RightHandlerBusinessService : ServiceBase<GarageDbContext>, IRightHandlerBusinessService
    {
        public RightHandlerBusinessService(IUnitOfWork<GarageDbContext> unitOfWork) : base(unitOfWork)
        { }

        public bool CheckPermissionOfUser(int userId, int? roleId, int moduleId, int rightValue)
        {
            bool isAllow = RightHandler(userId, roleId, moduleId, rightValue);
            return isAllow;
        }

        private bool RightHandler(int userId, int? roleId, int moduleId, int rightValue)
        {
            try
            {
                var valueUserGroup = Context.RoleRightModules.FirstOrDefault(x => x.RoleId == roleId && x.ModuleId == moduleId);
                var valueUser = Context.RoleRightModules.FirstOrDefault(x => x.UserId == userId && x.ModuleId == moduleId);

                bool checkUserGroup = true;
                bool checkUser = true;

                if (valueUserGroup == null)
                    checkUserGroup = false;
                if (valueUser == null)
                    checkUser = false;

                if (roleId == 1)
                {
                    return true;
                }
                else
                {
                    //Step 1: check position
                    if (checkUserGroup && checkUser) // checkPosition != null && checkUser != null
                    {
                        checkUserGroup = (valueUserGroup.Value & rightValue) > 0;
                        checkUser = (valueUser.Value & rightValue) > 0;
                        if (checkUserGroup && checkUser)
                            return true;
                        else if (checkUserGroup && !checkUser)
                            return false;
                        else if (!checkUserGroup && checkUser)
                            return true;
                        return false;
                    }
                    else if (checkUserGroup && !checkUser) // checkUserGroup != null && checkUser == null
                    {
                        checkUserGroup = (valueUserGroup.Value & rightValue) > 0;
                        return checkUserGroup;
                    }
                    else if (!checkUserGroup && checkUser) // checkUserGroup == null && checkUser != null
                    {
                        checkUser = (valueUser.Value & rightValue) > 0;
                        return checkUser;
                    }
                    else return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
