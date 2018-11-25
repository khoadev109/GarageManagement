using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Core.WebAPI.Result;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business.Garage
{
    public class RoleBusinessService : ServiceBase<GarageDbContext>, IRoleBusinessService
    {
        private readonly IRepository<Role> _roleRepository;

        public RoleBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _roleRepository = base.unitOfWork.GetRepository<Role>();
        }

        public Task<DataResult<List<DTORole>>> Get(int _group)
        {
            return Task.Run(() =>
            {
                var roles = _roleRepository.GetAll().ToList();

                var result = new DataResult<List<DTORole>>()
                {
                    Target = mapper.Map<List<DTORole>>(roles)
                };

                return result;
            });
        }
    }
}
