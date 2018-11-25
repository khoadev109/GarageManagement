using System;
using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.RepositoryInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business.Garage
{
    public class ModuleBusinessService : ServiceBase<GarageDbContext>, IModuleBusinessService
    {
        public ModuleBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {

        }

        public Task<DataResult<List<DTOModule>>> Get()
        {
            return Task.Run(() =>
            {
                var result = new DataResult<List<DTOModule>>();
                try
                {
                    var query = Context.Modules.Select(x => new DTOModule
                    {
                        Id = x.Id,
                        Name = x.Name,
                        RightModules = (from a in Context.Rights
                                        join b in Context.RightModules on a.Id equals b.RightId
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
