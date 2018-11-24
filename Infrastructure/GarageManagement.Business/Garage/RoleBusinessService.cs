using AutoMapper;
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
    public class RoleBusinessService : ServiceBase<GarageDbContext>, IRoleBusinessService
    {
        private readonly IMapper _mapper;

        public RoleBusinessService(IUnitOfWork<GarageDbContext> _unitOfWork, IMapper mapper) : base(_unitOfWork)
        {
            _mapper = mapper;
        }

        public Task<DataResult<List<DTORole>>> Get(int _group)
        {
            return Task.Run(() =>
            {
                var repository = _unitOfWork.GetRepository<Role>();
                var result = new DataResult<List<DTORole>>();
                                        
                var query = repository.GetAll().ToList();
                var dtos = _mapper.Map<List<DTORole>>(query);
                result.Target = dtos;
                    
                return result;                
            });
        }
    }
}
