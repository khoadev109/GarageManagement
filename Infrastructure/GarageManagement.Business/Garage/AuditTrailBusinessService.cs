using System;
using AutoMapper;
using System.Linq;
using Common.Core.Extension;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using GarageManagement.RepositoryInterface;
using GarageManagement.Garage.Entity.Enum;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Repositories;

namespace GarageManagement.Business.Garage
{
    public class AuditTrailBusinessService : ServiceBase<GarageDbContext>, IAuditTrailBusinessService
    {
        public IMapper _mapper;
        private readonly IAuditTrailLogRepository _auditTrailLogRepository;

        public AuditTrailBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper, IAuditTrailLogRepository auditTrailLogRepository) : base(unitOfWork)
        {
            _mapper = mapper;
            _auditTrailLogRepository = auditTrailLogRepository;
        }
    }
}
