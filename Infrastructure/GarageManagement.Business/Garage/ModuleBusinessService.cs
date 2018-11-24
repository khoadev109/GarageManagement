using GarageManagement.Garage.Entity.Context;
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
    public class ModuleBusinessService : ServiceBase<GarageDbContext>, IModuleBusinessService
    {
        public ModuleBusinessService(IUnitOfWork<GarageDbContext> _unitOfWork) : base(_unitOfWork)
        {

        }

        public Task<DataResult<List<DTOModule>>> Get()
        {
            return Task.Run(() =>
            {
                var db = _unitOfWork.DbContext;
                var result = new DataResult<List<DTOModule>>();
                try
                {
                    var query = db.Modules.Select(x => new DTOModule
                    {
                        Id = x.Id,
                        Name = x.Name,
                        RightModules = (from a in db.Rights
                                            join b in db.RightModules on a.Id equals b.RightId
                                            where b.ModuleId == x.Id
                                            select new DTORight
                                            {
                                                Id = a.Id,
                                                Name = a.Name
                                            }).ToList()
                    }).ToList();
                    result.Target = query;
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
