using System;
using AutoMapper;
using GarageManagement.RepositoryInterface;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.RepositoryInterface.Repositories;

namespace GarageManagement.Business.Garage
{
    public class AuditTrailBusinessService : ServiceBase<GarageDbContext>, IAuditTrailBusinessService
    {
        private readonly IAuditTrailLogRepository _auditTrailLogRepository;

        public AuditTrailBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper, IAuditTrailLogRepository auditTrailLogRepository) : base(unitOfWork, mapper)
        {
            _auditTrailLogRepository = auditTrailLogRepository;
        }
    }
}
