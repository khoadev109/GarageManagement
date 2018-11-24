using System;
using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business.Garage
{
    public class MaintenanceScheduleBusinessService : ServiceBase<GarageDbContext>, IMaintenanceScheduleBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<MaintenanceSchedule> _maintenanceScheduleRepository;

        public MaintenanceScheduleBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            _maintenanceScheduleRepository = _unitOfWork.GetRepository<MaintenanceSchedule>();
        }

        public Task<DataResult<List<DTOTemplateSchedule>>> GetQueuedItemsPrepareToSendAsync()
        {
            Expression<Func<MaintenanceSchedule, bool>> condition = x => x.Status == MaintenanceScheduleStatus.Queued.ToString() &&
                                                                         x.Startdate == DateTime.Now;
            return GetCommonTemplateScheduleItems(condition);
        }

        public Task<DataResult<List<DTOTemplateSchedule>>> GetErrorItemsToRetrySendAsync()
        {
            Expression<Func<MaintenanceSchedule, bool>> condition = x => x.Status == MaintenanceScheduleStatus.Error.ToString() &&
                                                                         x.RetryCount < 3;
            return GetCommonTemplateScheduleItems(condition);
        }

        public Task<DataResult<List<DTOTemplateSchedule>>> GetErrorItemsRetriedSendButFailAsync()
        {
            Expression<Func<MaintenanceSchedule, bool>> condition = x => x.Status == MaintenanceScheduleStatus.Error.ToString() &&
                                                                         x.RetryCount == 3;
            return GetCommonTemplateScheduleItems(condition);
        }

        public Task<DataResult<List<DTOTemplateSchedule>>> GetProcessingItemsAsync()
        {
            Expression<Func<MaintenanceSchedule, bool>> condition = x => x.Status == MaintenanceScheduleStatus.Processing.ToString();
            return GetCommonTemplateScheduleItems(condition);
        }

        public Task<DataResult<List<DTOTemplateSchedule>>> GetInformedItemsAsync()
        {
            Expression<Func<MaintenanceSchedule, bool>> condition = x => x.Status == MaintenanceScheduleStatus.Informed.ToString();
            return GetCommonTemplateScheduleItems(condition);
        }

        public Task<DataResult<DTOMaintenanceSchedule>> CreateAsync(DTOMaintenanceSchedule maintenanceScheduleDTO)
        {
            var entity = _mapper.Map<MaintenanceSchedule>(maintenanceScheduleDTO);
            var createdEntity = _maintenanceScheduleRepository.Insert(entity);

            _unitOfWork.SaveChanges();

            return Task.Run(() =>
            {
                return new DataResult<DTOMaintenanceSchedule>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = _mapper.Map<DTOMaintenanceSchedule>(createdEntity)
                };
            });
        }

        private Task<DataResult<List<DTOTemplateSchedule>>> GetCommonTemplateScheduleItems(Expression<Func<MaintenanceSchedule, bool>> condition)
        {
            return Task.Run(() =>
            {
                var result = _maintenanceScheduleRepository.Get(condition,
                                                            orderBy: o => o.OrderByDescending(x => x.Startdate),
                                                            includes: new Expression<Func<MaintenanceSchedule, object>>[]
                                                            {
                                                                x => x.Quotation,
                                                                x => x.Quotation.CustomerExchange.Car,
                                                                x => x.Quotation.CustomerExchange.Customer
                                                            })
                                                            .Select(x => new DTOTemplateSchedule
                                                            {
                                                                QuotationId = x.QuotationId,
                                                                Km = x.Km,
                                                                Startdate = x.Startdate,
                                                                Status = x.Status,
                                                                CustomerName = x.Quotation.CustomerExchange.Customer.Name,
                                                                CustomerAddress = x.Quotation.CustomerExchange.Customer.Address,
                                                                CustomerPhone = x.Quotation.CustomerExchange.Customer.Phone,

                                                            })
                                                            .ToList();

                return new DataResult<List<DTOTemplateSchedule>> { Errors = new List<ErrorDescriber>(), Target = result };
            });
        }
    }
}
