using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using Common.Core.Extension;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Enum;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.RepositoryInterface.Repositories;

namespace GarageManagement.Business.Garage
{
    public class QuotationBusinessService : ServiceBase<GarageDbContext>, IQuotationBusinessService
    {
        private readonly IRepository<Car> carRepository;
        private readonly IRepository<Branch> branchRepository;
        private readonly IRepository<Customer> customerRepository;
        private readonly IRepository<Employee> employeeRepository;
        private readonly IRepository<Service> serviceRepository;
        private readonly IRepository<Accessary> accessaryRepository;
        private readonly IRepository<ServiceUnit> serviceUnitRepository;
        private readonly IRepository<AccessaryUnit> accessaryUnitRepository;
        private readonly IRepository<Category> categoryRepository;
        private readonly IRepository<ServiceType> serviceTypeRepository;
        private readonly IRepository<Quotation> quotationRepository;
        private readonly IRepository<QuotationNote> quotationNoteRepository;
        private readonly IRepository<QuotationItem> quotationItemRepository;
        private readonly IRepository<QuotationStatus> quotationStatusRepository;
        private readonly IRepository<QuotationEmployee> quotationEmployeeRepository;
        private readonly IRepository<ReceiptsBill> receiptsBillRepository;
        private readonly IRepository<PaySlipBill> paySlipBillRepository;
        private readonly IRepository<PrintTemplate> printTemplateRepository;
        private readonly IAuditTrailLogRepository _auditTrailLogRepository;

        public QuotationBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper, IAuditTrailLogRepository auditTrailLogRepository) : base(unitOfWork, mapper)
        {
            carRepository = base.unitOfWork.GetRepository<Car>();
            branchRepository = base.unitOfWork.GetRepository<Branch>();
            customerRepository = base.unitOfWork.GetRepository<Customer>();
            employeeRepository = base.unitOfWork.GetRepository<Employee>();
            serviceRepository = base.unitOfWork.GetRepository<Service>();
            accessaryRepository = base.unitOfWork.GetRepository<Accessary>();
            serviceUnitRepository = base.unitOfWork.GetRepository<ServiceUnit>();
            accessaryUnitRepository = base.unitOfWork.GetRepository<AccessaryUnit>();
            categoryRepository = base.unitOfWork.GetRepository<Category>();
            serviceTypeRepository = base.unitOfWork.GetRepository<ServiceType>();
            quotationRepository = base.unitOfWork.GetRepository<Quotation>();
            quotationNoteRepository = base.unitOfWork.GetRepository<QuotationNote>();
            quotationItemRepository = base.unitOfWork.GetRepository<QuotationItem>();
            quotationStatusRepository = base.unitOfWork.GetRepository<QuotationStatus>();
            quotationEmployeeRepository = base.unitOfWork.GetRepository<QuotationEmployee>();
            receiptsBillRepository = base.unitOfWork.GetRepository<ReceiptsBill>();
            paySlipBillRepository = base.unitOfWork.GetRepository<PaySlipBill>();
            printTemplateRepository = base.unitOfWork.GetRepository<PrintTemplate>();
            _auditTrailLogRepository = auditTrailLogRepository;
        }

        public Task<DataResult<DTOQuotationNote>> GetSpecifyNoteAsync(string quotationId, int statusId)
        {
            return Task.Run(() =>
            {
                var noteDTO = new DTOQuotationNote();

                var note = quotationNoteRepository.GetFirstOrDefault(x => x.QuotationId == quotationId && x.StatusId == statusId,
                                                                     includes: new Expression<Func<QuotationNote, object>>[] { x => x.Quotation, x => x.Status });
                if (note != null)
                    noteDTO = mapper.Map<DTOQuotationNote>(note);

                return new DataResult<DTOQuotationNote> { Errors = new List<ErrorDescriber>(), Target = noteDTO };
            });
        }

        public Task<DataResult<DTOQuotation>> GetQuotationByIdAsync(string quotationId)
        {
            return Task.Run(() =>
            {
                var quotationDTO = new DTOQuotation();

                Expression<Func<Quotation, object>>[] includes =
                {
                    x => x.Status,
                    x => x.CustomerExchange.Car,
                    x => x.CustomerExchange.Customer,
                    x => x.CustomerExchange.Customer.Branch,
                    x => x.CustomerExchange.Customer.CustomerType
                };

                var quotation = quotationRepository.GetFirstOrDefault(x => x.Id == quotationId, includes: includes);
                if (quotation != null)
                    quotationDTO = mapper.Map<DTOQuotation>(quotation);

                return new DataResult<DTOQuotation> { Errors = new List<ErrorDescriber>(), Target = quotationDTO };
            });
        }

        public Task<DataResult<List<DTOEmployee>>> GetEmployeesByQuotationIdAsync(string quotationId)
        {
            return Task.Run(() =>
            {
                var employeeDTOs = new List<DTOEmployee>();

                Expression<Func<QuotationEmployee, object>>[] includes = { x => x.Employee, x => x.Quotation };
                var quotationEmployees = quotationEmployeeRepository.Get(x => x.QuotationId == quotationId, includes: includes);
                if (quotationEmployees != null)
                {
                    quotationEmployees.ForEach((qe) =>
                    {
                        employeeDTOs.Add(new DTOEmployee
                        {
                            Id = qe.EmployeeId,
                            Name = qe.Employee?.Name,
                            Phone = qe.Employee?.Name
                        });
                    });
                }

                return new DataResult<List<DTOEmployee>> { Errors = new List<ErrorDescriber>(), Target = employeeDTOs };
            });
        }

        public Task<DataResult<List<DTOQuotationItem>>> GetQuotationItemsByQuotationIdAsync(string quotationId)
        {
            return Task.Run(() =>
            {
                var quotationItemDTOs = new List<DTOQuotationItem>();

                Expression<Func<QuotationItem, object>>[] includes = { x => x.Quotation, x => x.Accessary, x => x.Service };

                var quotationItems = quotationItemRepository.Get(x => x.QuotationId == quotationId, includes: includes);
                if (quotationItems != null && quotationItems.Count > 0)
                {
                    quotationItemDTOs = mapper.Map<List<DTOQuotationItem>>(quotationItems);
                    quotationItemDTOs = quotationItemDTOs.Select(item =>
                    {
                        item.AccessaryName = accessaryRepository.GetById(item.AccessaryId)?.Name;
                        item.ServiceName = serviceRepository.GetById(item.ServiceId)?.Name;
                        item.EmployeeName = employeeRepository.GetById(item.EmployeeId)?.Name;

                        if (!string.IsNullOrEmpty(item.AccessaryId))
                            item.UnitName = accessaryUnitRepository.GetById(item.UnitId)?.Name;

                        if (!string.IsNullOrEmpty(item.ServiceId))
                            item.UnitName = serviceUnitRepository.GetById(item.UnitId)?.Name;

                        return item;
                    }).ToList();
                }

                return new DataResult<List<DTOQuotationItem>> { Errors = new List<ErrorDescriber>(), Target = quotationItemDTOs };
            });
        }

        public Task<DataResult<List<DTOParentCategoryWithItems>>> GetParentCategoriesWithItemsByQuotationIdAsync(string quotationId)
        {
            return Task.Run(() =>
            {
                var itemsWithParentCategories = new List<DTOParentCategoryWithItems>();
                
                var parentCategories = categoryRepository.GetAll(orderBy: c => c.OrderBy(x => x.Name)).ToList();
                parentCategories.ForEach(parentCategory =>
                {
                    Func<IQueryable<QuotationItem>, IOrderedQueryable<QuotationItem>> orderBy = x => x.OrderBy(c => c.Accessary.Category.Name);
                    Expression<Func<QuotationItem, object>>[] includes = { x => x.Quotation, x => x.Accessary.Category, x => x.AccessaryUnit };

                    var items = quotationItemRepository.Get(x => x.QuotationId == quotationId && !string.IsNullOrEmpty(x.AccessaryId) &&
                                                                 x.Accessary.CategoryId == parentCategory.Id,
                                                            includes: includes, orderBy: orderBy).ToList();

                    if (items.Count > 0)
                    {
                        var itemsWithParentCategory = new DTOParentCategoryWithItems();
                        itemsWithParentCategory.ParentCategory = mapper.Map<DTOCategory>(parentCategory);
                        itemsWithParentCategory.Items = mapper.Map<List<DTOQuotationItem>>(items);
                        itemsWithParentCategories.Add(itemsWithParentCategory);
                    }
                });

                return new DataResult<List<DTOParentCategoryWithItems>> { Errors = new List<ErrorDescriber>(), Target = itemsWithParentCategories };
            });
        }
        
        public Task<DataResult<List<DTOParentServiceTypeWithItems>>> GetParentServiceTypesWithItemsByQuotationIdAsync(string quotationId)
        {
            return Task.Run(() =>
            {
                var itemsWithParentServiceTypes = new List<DTOParentServiceTypeWithItems>();

                var parentServiceTypes = serviceTypeRepository.GetAll(orderBy: s => s.OrderBy(x => x.Name)).ToList();
                parentServiceTypes.ForEach(parentServiceType =>
                {
                    Func<IQueryable<QuotationItem>, IOrderedQueryable<QuotationItem>> orderBy = x => x.OrderBy(c => c.Service.ServiceType.Name);
                    Expression<Func<QuotationItem, object>>[] includes = { x => x.Quotation, x => x.Service.ServiceType, x => x.Employee, x => x.ServiceUnit };

                    var items = quotationItemRepository.Get(x => x.QuotationId == quotationId && !string.IsNullOrEmpty(x.ServiceId) &&
                                                                 x.Service.ServiceTypeId == parentServiceType.Id,
                                                            includes: includes, orderBy: orderBy).ToList();

                    if (items.Count > 0)
                    {
                        var itemsWithParentService = new DTOParentServiceTypeWithItems();
                        itemsWithParentService.ParentServiceType = mapper.Map<DTOServiceType>(parentServiceType);
                        itemsWithParentService.Items = mapper.Map<List<DTOQuotationItem>>(items);
                        itemsWithParentServiceTypes.Add(itemsWithParentService);
                    }
                });

                return new DataResult<List<DTOParentServiceTypeWithItems>> { Errors = new List<ErrorDescriber>(), Target = itemsWithParentServiceTypes };
            });
        }

        public Task<DataResult<DTOQuotationItem>> GetQuotationItemByIdAsync(int quotationItemId)
        {
            return Task.Run(() =>
            {
                var quotationItemDTO = new DTOQuotationItem();

                Expression<Func<QuotationItem, object>>[] includes = { x => x.Accessary, x => x.Service, x => x.Accessary.Unit, x => x.Service.Unit };

                var quotationItem = quotationItemRepository.GetFirstOrDefault(x => x.Id == quotationItemId, includes: includes);
                if (quotationItem != null)
                {
                    quotationItemDTO = mapper.Map<DTOQuotationItem>(quotationItem);
                }

                return new DataResult<DTOQuotationItem> { Errors = new List<ErrorDescriber>(), Target = quotationItemDTO };
            });
        }

        public Task<DataResult<DTOPaySlipBill>> GetPaySlipByIdAsync(int paySlipId)
        {
            return Task.Run(() =>
            {
                var paySlipDTO = new DTOPaySlipBill();

                var paySlipEntity = paySlipBillRepository.GetById(paySlipId);
                if (paySlipEntity != null)
                    paySlipDTO = mapper.Map<DTOPaySlipBill>(paySlipEntity);

                return new DataResult<DTOPaySlipBill> { Errors = new List<ErrorDescriber>(), Target = paySlipDTO };
            });
        }

        public Task<DataResult<DTOReceiptsBill>> GetReceiptByIdAsync(int receiptId)
        {
            return Task.Run(() =>
            {
                var receiptsDTO = new DTOReceiptsBill();

                var receiptsEntity = receiptsBillRepository.GetById(receiptId);
                if (receiptsEntity != null)
                    receiptsDTO = mapper.Map<DTOReceiptsBill>(receiptsEntity);

                return new DataResult<DTOReceiptsBill> { Errors = new List<ErrorDescriber>(), Target = receiptsDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOReceiptsBill>>> GetReceiptsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                        CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<ReceiptsBill>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Quotation";

                var sort = new FieldSortCriteria<ReceiptsBill>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Id == int.Parse(searchTerm) || x.QuotationId == searchTerm);

                var pagedReceipts = receiptsBillRepository.Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOReceiptsBill>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOReceiptsBill, ReceiptsBill>(mapper, pagedReceipts)
                };

            }, cancellationToken);
        }

        public Task<DataResult<IPagedListResult<DTOPaySlipBill>>> GetPayslipsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                       CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<PaySlipBill>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Quotation";

                var sort = new FieldSortCriteria<PaySlipBill>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Id == int.Parse(searchTerm) || x.QuotationId == searchTerm);

                var pagedPayslips = paySlipBillRepository.Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOPaySlipBill>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOPaySlipBill, PaySlipBill>(mapper, pagedPayslips)
                };

            }, cancellationToken);
        }

        public Task<DataResult<IPagedListResult<DTOQuotationItem>>> GetQuotationItemsWithPagingAsync(string quotationId, string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                               CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<QuotationItem>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Quotation,Accessary,Accessary.Unit,Service,Service.Unit,Employee";

                var sort = new FieldSortCriteria<QuotationItem>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                searchQuery.AddFilter(x => x.QuotationId == quotationId);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Service.Name.Contains(searchTerm) || x.Accessary.Name.Contains(searchTerm));

                var pagedQuotationItems = unitOfWork.GetRepository<QuotationItem>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOQuotationItem>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOQuotationItem, QuotationItem>(mapper, pagedQuotationItems)
                };

            }, cancellationToken);
        }

        public Task<DataResult<IPagedListResult<DTOQuotation>>> GetQuotationsLookupWithPagingAsync(List<Expression<Func<Quotation, bool>>> searchTerm,
                                                                                             string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                             CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Quotation>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Branch,Status,CustomerExchange,CustomerExchange.Customer,CustomerExchange.Car";

                var sort = new FieldSortCriteria<Quotation>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                foreach (var searchCondition in searchTerm)
                {
                    searchQuery.AddFilter(searchCondition);
                }

                var pagedQuotations = unitOfWork.GetRepository<Quotation>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOQuotation>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOQuotation, Quotation>(mapper, pagedQuotations)
                };

            }, cancellationToken);
        }

        public Task<DataResult<List<string>>> GetAllQuotationsBySearchTermAsync(string searchTerm)
        {
            return Task.Run(() =>
            {
                var quotationsFilter = quotationRepository.Get(x => x.Id.Contains(searchTerm) || string.IsNullOrEmpty(searchTerm),
                                                               orderBy: o => o.OrderBy(x => x.Id))
                                                       .Select(x => x.Id)
                                                       .ToList();

                return new DataResult<List<string>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = quotationsFilter
                };
            });
        }

        public Task<DataResult<List<string>>> GetPendingQuotationsAsync(int statusId, string searchTerm)
        {
            return Task.Run(() =>
            {
                return new DataResult<List<string>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = FetchPendingQuotations(statusId, searchTerm)
                };
            });
        }

        public Task<DataResult<bool>> EditQuotationAsync(DTOQuotation quotationDTO)
        {
            return Task.Run(() =>
            {
                var quotation = mapper.Map<Quotation>(quotationDTO);

                quotation.UpdateDate = DateTime.Now;

                if (quotation.StatusId != (int)DTOQuotationStatusName.CheckUp)
                {
                    quotation.NextKm = null;
                    quotation.NextMaintenanceDate = null;
                }
                else
                {
                    quotation.CompleteDate = DateTime.Now;
                }

                var original = quotationRepository.GetById(quotationDTO.Id);
                var dtoOriginal = mapper.Map<DTOQuotation>(original);

                quotationRepository.Update(quotation);
                unitOfWork.SaveChanges();

                var dto = mapper.Map<DTOQuotation>(quotation);
                _auditTrailLogRepository.InsertLogForUpdateAction(ModuleEnum.Quotation, dto.UserName, dto, dtoOriginal);

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }

        public Task<DataResult<int>> UpdateQuotationStatusAsync(string quotationId, int status)
        {
            return Task.Run(() =>
            {
                var quotation = quotationRepository.GetById(quotationId);
                if (quotation != null)
                {
                    quotation.UpdateDate = DateTime.Now;
                    quotation.StatusId = status;
                }

                var original = quotationRepository.GetById(quotationId);
                var dtoOriginal = mapper.Map<DTOQuotation>(original);

                var updatedQuotation = quotationRepository.Update(quotation);
                unitOfWork.SaveChanges();

                var dto = mapper.Map<DTOQuotation>(quotation);
                _auditTrailLogRepository.InsertLogForUpdateAction(ModuleEnum.Quotation, dto.UserName, dto, dtoOriginal);

                return new DataResult<int>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = updatedQuotation.StatusId
                };
            });
        }

        public Task<DataResult<DTOQuotation>> CreateQuotationAsync(DTOQuotation quotationDTO)
        {
            return Task.Run(() =>
            {
                var createdQuotationDTO = new DTOQuotation();

                if (!quotationRepository.ExistByCondition(x => x.Id == quotationDTO.Id))
                {
                    var quotation = mapper.Map<Quotation>(quotationDTO);

                    var lastQuotation = quotationRepository.Identity(x => x.GenerateId);
                    var identityNumber = lastQuotation != null ? lastQuotation.GenerateId : 0;

                    quotation.Id = GetShortNameByBranchId(quotationDTO.BranchId) +
                    IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Quotation.ToDefaultValue() }, NumberUnitType.Large);

                    quotation.StartDate = DateTime.Now;
                    quotation.EntryDate = DateTime.Now;
                    quotation.StatusId = (int)DTOQuotationStatusName.RequestFromCustomer;
                    quotation.Branch = branchRepository.GetById(quotation.BranchId);
                    quotation.Status = quotationStatusRepository.GetById(quotation.StatusId);

                    var result = quotationRepository.Insert(quotation);
                    unitOfWork.SaveChanges();

                    createdQuotationDTO = mapper.Map<DTOQuotation>(quotation);

                    var createdQuotation = mapper.Map<Quotation>(createdQuotationDTO);
                    _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.Quotation, quotationDTO.UserName, createdQuotation);
                }
                return new DataResult<DTOQuotation> { Errors = new List<ErrorDescriber>(), Target = createdQuotationDTO };
            });
        }

        public Task<DataResult<DTOQuotationItem>> CreateQuotationItemAsync(DTOQuotationItem quotationItemDTO)
        {
            return Task.Run(() =>
            {
                var createdQuotationItemDTO = new DTOQuotationItem();
                var quotationItem = mapper.Map<QuotationItem>(quotationItemDTO);

                var createdQuotationItem = quotationItemRepository.Insert(quotationItem);
                unitOfWork.SaveChanges();

                createdQuotationItemDTO = mapper.Map<DTOQuotationItem>(createdQuotationItem);
                
                _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.Quotation, createdQuotationItemDTO.UserName, createdQuotationItemDTO);

                return new DataResult<DTOQuotationItem> { Errors = new List<ErrorDescriber>(), Target = createdQuotationItemDTO };
            });
        }

        public Task<DataResult<DTOQuotationItem>> EditQuotationItemAsync(DTOQuotationItem quotationItemDTO)
        {
            return Task.Run(() =>
            {
                var quotationItem = mapper.Map<QuotationItem>(quotationItemDTO);

                var original = quotationItemRepository.GetById(quotationItemDTO.Id);
                var dtoOriginal = mapper.Map<DTOQuotationItem>(original);

                var updatedQuotationItem = quotationItemRepository.Update(quotationItem);
                unitOfWork.SaveChanges();

                var dto = mapper.Map<DTOQuotationItem>(updatedQuotationItem);
                _auditTrailLogRepository.InsertLogForUpdateAction(ModuleEnum.Quotation, dto.UserName, dto, dtoOriginal);

                return new DataResult<DTOQuotationItem> { Errors = new List<ErrorDescriber>(), Target = mapper.Map<DTOQuotationItem>(updatedQuotationItem) };
            });
        }

        public Task<DataResult<bool>> DeleteQuotationItemAsync(int quotationItemId)
        {
            return Task.Run(() =>
            {
                var quotationItem = quotationItemRepository.GetById(quotationItemId);
                quotationItemRepository.Delete(quotationItemId);
                unitOfWork.SaveChanges();

                var dto = mapper.Map<DTOQuotationItem>(quotationItem);
                _auditTrailLogRepository.InsertLogForDeleteAction(ModuleEnum.Quotation, dto.UserName, dto);

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }

        public Task<DataResult<bool>> CreateOrUpdateNoteForSpecifyStepAsync(int noteId, DTOQuotationNote noteDTO)
        {
            return Task.Run(() =>
            {
                if (noteId == noteDTO.Id)
                {
                    var noteEntity = quotationNoteRepository.GetById(noteId);
                    var quotationNote = new QuotationNote();

                    if (noteEntity == null)
                    {
                        noteEntity = mapper.Map<QuotationNote>(noteDTO);
                        quotationNote = quotationNoteRepository.Insert(noteEntity);
                    }
                    else
                    {
                        noteEntity.Note = noteDTO.Note;
                        quotationNote = quotationNoteRepository.Update(noteEntity);
                    }

                    unitOfWork.SaveChanges();
                }

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }

        public Task<DataResult<bool>> CreateQuotationItemsAsync(string quotationId, List<DTOQuotationItem> quotationItemDTOs)
        {
            return Task.Run(() =>
            {
                var quotationItems = mapper.Map<List<QuotationItem>>(quotationItemDTOs);
                quotationItems = quotationItems.Select(item =>
                {

                    item.QuotationId = quotationId;
                    item.EmployeeId = null;
                    item.AccessaryId = item.AccessaryId != "" ? item.AccessaryId : null;
                    item.ServiceId = item.ServiceId != "" ? item.ServiceId : null;
                    item.VAT = 10;
                    return item;

                }).ToList();

                quotationItemRepository.InsertMultiple(quotationItems);
                unitOfWork.SaveChanges();

                var dtos = mapper.Map<List<DTOQuotationItem>>(quotationItems);
                dtos.ForEach(x =>
                {
                    _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.Quotation, x.UserName, x);
                });

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }

        public Task<DataResult<int>> CreateOrUpdateEmployeesForQuotationAsync(string quotationId, List<string> employeeIds)
        {
            return Task.Run(() =>
            {
                var quotationEmployees = new List<QuotationEmployee>();

                employeeIds.ForEach((employeeId) =>
                {
                    quotationEmployees.Add(new QuotationEmployee
                    {
                        EmployeeId = employeeId,
                        QuotationId = quotationId,
                        Employee = employeeRepository.GetById(employeeId),
                        Quotation = quotationRepository.GetById(quotationId)
                    });
                });

                quotationEmployeeRepository.Delete(x => x.QuotationId == quotationId);
                quotationEmployeeRepository.InsertMultiple(quotationEmployees);

                unitOfWork.SaveChanges();

                var dto = mapper.Map<DTOQuotationItem>(quotationEmployees);
                _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.Quotation, dto.UserName, dto);

                int? lastQuotationEmployeeId = quotationEmployeeRepository.Get(x => x.Id > 0, orderBy: x => x.OrderByDescending(qe => qe.Id))?.FirstOrDefault()?.Id;

                return new DataResult<int> { Errors = new List<ErrorDescriber>(), Target = lastQuotationEmployeeId.GetValueOrDefault() };
            });
        }

        public Task<DataResult<bool>> CreateOrUpdateItemsForQuotationAsync(string quotationId, List<DTOQuotationItem> quotationItemDTOs)
        {
            return Task.Run(() =>
            {
                var quotationItems = mapper.Map<List<QuotationItem>>(quotationItemDTOs);

                quotationItemRepository.Delete(x => x.QuotationId == quotationId);

                quotationItems = quotationItems.Select(item =>
                {
                    item.QuotationId = quotationId;
                    return item;
                }).ToList();

                quotationItemRepository.InsertMultiple(quotationItems);

                unitOfWork.SaveChanges();

                var dtos = mapper.Map<List<DTOQuotationItem>>(quotationItems);
                dtos.ForEach(x =>
                {
                    _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.Quotation, x.UserName, x);
                });

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }

        public Task<DataResult<DTOReceiptsBill>> CreateOrUpdateReceiptsBillAsync(DTOReceiptsBill receiptsBillDTO)
        {
            return Task.Run(() =>
            {
                var modifiedReceiptsBillDTO = new DTOReceiptsBill();

                if (!string.IsNullOrEmpty(receiptsBillDTO.QuotationId))
                    modifiedReceiptsBillDTO = CreateOrUpdateReceiptsBillBaseOnCondition(receiptsBillDTO, receiptsBillRepository.ExistByCondition(x => x.QuotationId == receiptsBillDTO.QuotationId));
                else
                    modifiedReceiptsBillDTO = CreateOrUpdateReceiptsBillBaseOnCondition(receiptsBillDTO, receiptsBillRepository.ExistByCondition(x => x.Id == receiptsBillDTO.Id));

                _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.ReceiptBill, modifiedReceiptsBillDTO.UserName, modifiedReceiptsBillDTO);

                return new DataResult<DTOReceiptsBill> { Errors = new List<ErrorDescriber>(), Target = modifiedReceiptsBillDTO };
            });
        }

        public Task<DataResult<DTOPaySlipBill>> CreateOrUpdatePaySlipBillAsync(DTOPaySlipBill paySlipBillDTO)
        {
            return Task.Run(() =>
            {
                var modifiedPaySlipBillDTO = new DTOPaySlipBill();

                if (!string.IsNullOrEmpty(paySlipBillDTO.QuotationId))
                    modifiedPaySlipBillDTO = CreateOrUpdatePaySlipBillBaseOnCondition(paySlipBillDTO, paySlipBillRepository.ExistByCondition(x => x.QuotationId == paySlipBillDTO.QuotationId));
                else
                    modifiedPaySlipBillDTO = CreateOrUpdatePaySlipBillBaseOnCondition(paySlipBillDTO, paySlipBillRepository.ExistByCondition(x => x.Id == paySlipBillDTO.Id));

                _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.PayslipBill, modifiedPaySlipBillDTO.UserName, modifiedPaySlipBillDTO);

                return new DataResult<DTOPaySlipBill> { Errors = new List<ErrorDescriber>(), Target = modifiedPaySlipBillDTO };
            });
        }

        private DTOReceiptsBill CreateOrUpdateReceiptsBillBaseOnCondition(DTOReceiptsBill receiptsBillDTO, bool existedConditionToCheck)
        {
            var receiptsBillEntity = mapper.Map<ReceiptsBill>(receiptsBillDTO);
            if (existedConditionToCheck)
            {
                receiptsBillEntity.ModifiedDate = DateTime.Now;
                receiptsBillEntity = receiptsBillRepository.Update(receiptsBillEntity);
            }
            else
            {
                receiptsBillEntity.CreateDate = DateTime.Now;
                receiptsBillEntity = receiptsBillRepository.Insert(receiptsBillEntity);
            }

            unitOfWork.SaveChanges();
            var dto = mapper.Map<DTOReceiptsBill>(receiptsBillEntity);
            _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.ReceiptBill, dto.UserName, dto);

            return mapper.Map<DTOReceiptsBill>(receiptsBillEntity);
        }

        private DTOPaySlipBill CreateOrUpdatePaySlipBillBaseOnCondition(DTOPaySlipBill paySlipBillDTO, bool existedConditionToCheck)
        {
            var paySlipBillEntity = mapper.Map<PaySlipBill>(paySlipBillDTO);

            if (existedConditionToCheck)
            {
                paySlipBillEntity.ModifiedDate = DateTime.Now;
                paySlipBillEntity = paySlipBillRepository.Update(paySlipBillEntity);
            }
            else
            {
                paySlipBillEntity.CreateDate = DateTime.Now;
                paySlipBillEntity = paySlipBillRepository.Insert(paySlipBillEntity);
            }

            unitOfWork.SaveChanges();
            var dto = mapper.Map<DTOPaySlipBill>(paySlipBillEntity);
            _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.PayslipBill, dto.UserName, dto);

            return mapper.Map<DTOPaySlipBill>(paySlipBillEntity);
        }

        private List<DTOEmployee> BindEmployeesByQuotationEmployee(List<QuotationEmployee> quotationEmployees)
        {
            var employeeDTOs = new List<DTOEmployee>();

            quotationEmployees.ForEach((quotationEmployee) =>
            {
                employeeDTOs.Add(new DTOEmployee
                {
                    Id = quotationEmployee.EmployeeId,
                    Name = quotationEmployee.Employee?.Name
                });
            });

            return employeeDTOs;
        }

        private string GetShortNameByBranchId(string id)
        {
            var branch = branchRepository.GetById(id);
            return branch != null ? branch.ShortName : string.Empty;
        }

        private List<string> FetchPendingQuotations(int statusId, string searchTerm)
        {
            var pendingQuotations = quotationRepository.Get(x => (x.StatusId == statusId &&
                                                                 (x.Id.Contains(searchTerm) || x.CustomerExchange.Car.LicensePlates.Contains(searchTerm) || string.IsNullOrEmpty(searchTerm))),
                                                                 orderBy: o => o.OrderByDescending(x => x.StartDate),
                                                                 includes: new Expression<Func<Quotation, object>>[]
                                                                 {
                                                                     x => x.CustomerExchange.Customer,
                                                                     x => x.CustomerExchange.Car
                                                                 })
                                                       .Select(x => string.Join(",", new string[] { x.Id, x.CustomerExchange?.Car?.LicensePlates }))
                                                       .ToList();
            return pendingQuotations;
        }

        public Task<DataResult<DTOPrintTemplate>> GetPrintTemplateByStatusIdAsync(int statusId)
        {
            return Task.Run(() =>
            {
                var printTemplateDTO = new DTOPrintTemplate();

                var printTemplateEntity = printTemplateRepository.GetFirstOrDefault(x => x.StatusId == statusId);
                if (printTemplateEntity != null)
                    printTemplateDTO = mapper.Map<DTOPrintTemplate>(printTemplateEntity);

                return new DataResult<DTOPrintTemplate> { Errors = new List<ErrorDescriber>(), Target = printTemplateDTO };
            });
        }

        public Task<DataResult<bool>> SavePrintTemplateAsync(DTOPrintTemplate printTemplateDto)
        {
            return Task.Run(() =>
            {
                var result = new DataResult<bool>();

                var entity = mapper.Map<PrintTemplate>(printTemplateDto);

                if (entity.Id == 0)
                {
                    entity = printTemplateRepository.Insert(entity);
                }
                else
                {
                    entity = printTemplateRepository.Update(entity);
                }

                var rowUpdated = unitOfWork.SaveChanges();
                var dto = mapper.Map<DTOPaySlipBill>(entity);
                _auditTrailLogRepository.InsertLogForCreateAction(ModuleEnum.PrintTemplate, dto.UserName, dto);

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = rowUpdated > 0 ? true : false };
            });
        }
    }
}
