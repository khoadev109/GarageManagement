using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.ServiceInterface.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GarageManagement.Business.Garage
{
    public class RoleRightModuleBusinessService : ServiceBase<GarageDbContext>, IRoleRightModuleBusinessService
    {
        public RoleRightModuleBusinessService(IUnitOfWork<GarageDbContext> _unitOfWork) : base(_unitOfWork)
        {

        }

        public Task<DataResult<bool>> Create(RoleRightModule roleRightModule)
        {
            return Task.Run(() =>
            {
                var db = _unitOfWork.DbContext;
                var result = new DataResult<bool>();
                try
                {
                    var perByUserGroup = db.RoleRightModules.Where(x => x.ModuleId == roleRightModule.ModuleId && x.RoleId == roleRightModule.RoleId).FirstOrDefault();
                    var perByUser = db.RoleRightModules.Where(x => x.ModuleId == roleRightModule.ModuleId && x.UserId == roleRightModule.UserId).FirstOrDefault();
                    if (roleRightModule.RoleId != null && perByUserGroup != null)
                        perByUserGroup.Value = roleRightModule.Value;
                    else if (roleRightModule.UserId != null && perByUser != null)
                        perByUser.Value = roleRightModule.Value;
                    else
                        db.RoleRightModules.Add(roleRightModule);
                    if (db.SaveChanges() > 0)
                        result.Target = true;
                    else
                        result.Target = false;
                }
                catch (Exception ex)
                {
                    return result;
                }
                return result;
                
            });
        }

        public Task<DataResult<List<DTORoleRightModule>>> GetByUser(int userId)
        {
            return Task.Run(() =>
            {
                var db = _unitOfWork.DbContext;
                var result = new DataResult<List<DTORoleRightModule>>();
                try
                {
                    var user = db.Users.Where(x => x.Id == userId).FirstOrDefault();
                    var query = new List<DTORoleRightModule>();
                    if (user != null)
                    {
                        query = (from a in db.RoleRightModules
                                    where a.RoleId == user.RoleId
                                    select new DTORoleRightModule
                                    {
                                        ModuleId = a.ModuleId,
                                        RoleId = a.RoleId,
                                        Value = a.Value,
                                        UserRights = (from c in db.RoleRightModules
                                                        where c.ModuleId == a.ModuleId && c.UserId == userId
                                                        select new DTOUserRight
                                                        {
                                                            ModuleId = c.ModuleId,
                                                            Id = c.Id,
                                                            Value = c.Value
                                                        }).ToList()
                                    }).ToList();
                    }
                    if (query != null)
                        result.Target = query;
                    else
                        result.AddError("Empty");
                }
                catch (Exception ex)
                {
                    result.AddError(ex);
                }
                return result;
            });
        }
                
        public Task<DataResult<List<DTORoleRightModule>>> GetByRole(int role_id)
        {
            return Task.Run(() =>
            {
                var db = _unitOfWork.DbContext;
                var result = new DataResult<List<DTORoleRightModule>>();
                try
                {
                    var query = new List<DTORoleRightModule>();
                    query = (from a in db.RoleRightModules
                                join b in db.Modules on a.ModuleId equals b.Id
                                join c in db.Roles on a.RoleId equals c.Id
                                where a.RoleId == role_id
                                select new DTORoleRightModule
                                {
                                    ModuleId = a.ModuleId,
                                    ModuleName = b.Name,
                                    RoleId = a.RoleId,
                                    RoleName = c.Name,
                                    Value = a.Value
                                }).ToList();
                    if (query != null)
                        result.Target = query;
                    else
                        result.AddError("Empty");
                }
                catch (Exception ex)
                {
                    result.AddError(ex);
                }
                return result;                
            });
        }
    }
}
