using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface IQuotationBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOQuotationNote>> GetSpecifyNoteAsync(string quotationId, int statusId);

        Task<DataResult<DTOQuotation>> GetQuotationByIdAsync(string quotationId);

        Task<DataResult<List<DTOEmployee>>> GetEmployeesByQuotationIdAsync(string quotationId);

        Task<DataResult<List<DTOQuotationItem>>> GetQuotationItemsByQuotationIdAsync(string quotationId);

        Task<DataResult<List<DTOParentCategoryWithItems>>> GetParentCategoriesWithItemsByQuotationIdAsync(string quotationId);

        Task<DataResult<List<DTOParentServiceTypeWithItems>>> GetParentServiceTypesWithItemsByQuotationIdAsync(string quotationId);

        Task<DataResult<DTOQuotationItem>> GetQuotationItemByIdAsync(int quotationItemId);

        Task<DataResult<DTOReceiptsBill>> GetReceiptByIdAsync(int receiptId);

        Task<DataResult<DTOPaySlipBill>> GetPaySlipByIdAsync(int paySlipId);

        Task<DataResult<IPagedListResult<DTOReceiptsBill>>> GetReceiptsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                      CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<IPagedListResult<DTOPaySlipBill>>> GetPayslipsWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                    CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<List<string>>> GetAllQuotationsBySearchTermAsync(string searchTerm);

        Task<DataResult<List<string>>> GetPendingQuotationsAsync(int statusId, string searchTerm);

        Task<DataResult<IPagedListResult<DTOQuotationItem>>> GetQuotationItemsWithPagingAsync(string quotationId, string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                            CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<IPagedListResult<DTOQuotation>>> GetQuotationsLookupWithPagingAsync(List<Expression<Func<Quotation, bool>>> searchTerm,
                                                                                             string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                             CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<bool>> EditQuotationAsync(DTOQuotation quotationDTO);

        Task<DataResult<int>> UpdateQuotationStatusAsync(string quotationId, int status);

        Task<DataResult<DTOQuotation>> CreateQuotationAsync(DTOQuotation quotationDTO);

        Task<DataResult<DTOQuotationItem>> CreateQuotationItemAsync(DTOQuotationItem quotationItemDTO);

        Task<DataResult<DTOQuotationItem>> EditQuotationItemAsync(DTOQuotationItem quotationItemDTO);

        Task<DataResult<bool>> DeleteQuotationItemAsync(int quotationItemId);

        Task<DataResult<bool>> CreateOrUpdateNoteForSpecifyStepAsync(int noteId, DTOQuotationNote noteDTO);

        Task<DataResult<bool>> CreateQuotationItemsAsync(string quotationId, List<DTOQuotationItem> quotationItemDTOs);

        Task<DataResult<int>> CreateOrUpdateEmployeesForQuotationAsync(string quotationId, List<string> employeeIds);

        Task<DataResult<bool>> CreateOrUpdateItemsForQuotationAsync(string quotationId, List<DTOQuotationItem> quotationItemDTOs);

        Task<DataResult<DTOReceiptsBill>> CreateOrUpdateReceiptsBillAsync(DTOReceiptsBill receiptsBillDTO);

        Task<DataResult<DTOPaySlipBill>> CreateOrUpdatePaySlipBillAsync(DTOPaySlipBill paySlipBillDTO);

        Task<DataResult<DTOPrintTemplate>> GetPrintTemplateByStatusIdAsync(int statusId);

        Task<DataResult<bool>> SavePrintTemplateAsync(DTOPrintTemplate printTemplateDto);
    }
}
