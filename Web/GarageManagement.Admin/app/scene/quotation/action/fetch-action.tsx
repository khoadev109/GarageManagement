import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class QuotationAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_QUOTATION_REQUEST;
    successAction = AT.GET_UNIQUE_QUOTATION_SUCCESS;    
    errorAction = AT.GET_UNIQUE_QUOTATION_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationService());
    }
}

export class AllQuotationAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_SPECIFIED_QUOTATION_INFO_REQUEST;
    successAction = AT.GET_ALL_SPECIFIED_QUOTATION_INFO_SUCCESS;    
    errorAction = AT.GET_ALL_SPECIFIED_QUOTATION_INFO_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllQuotationInfoService());
    }
}

export class QuotationItemAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_QUOTATION_ITEM_REQUEST;
    successAction = AT.GET_UNIQUE_QUOTATION_ITEM_SUCCESS;    
    errorAction = AT.GET_UNIQUE_QUOTATION_ITEM_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationItemService());
    }
}

export class NewQuotationItemAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.INITIALIZE_NEW_QUOTATION_ITEM_REQUEST;
    successAction = AT.INITIALIZE_NEW_QUOTATION_ITEM_SUCCESS;    
    errorAction = AT.INITIALIZE_NEW_QUOTATION_ITEM_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.NewQuotationItemService());
    }
}

export class QuotationEmployeesAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_EMPLOYEES_BY_QUOTATION_REQUEST;
    successAction = AT.GET_EMPLOYEES_BY_QUOTATION_SUCCESS;    
    errorAction = AT.GET_EMPLOYEES_BY_QUOTATION_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.EmployeesQuotationService());
    }
}

export class ReceiptsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_RECEIPT_REQUEST;
    successAction = AT.GET_UNIQUE_RECEIPT_SUCCESS;    
    errorAction = AT.GET_UNIQUE_RECEIPT_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ReceiptsQuotationService());
    }
}

export class PaySlipAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_PAYSLIP_REQUEST;
    successAction = AT.GET_UNIQUE_PAYSLIP_SUCCESS;    
    errorAction = AT.GET_UNIQUE_PAYSLIP_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PaySlipQuotationService());
    }
}

export class ReceiptsFilterAndPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.RECEIPTS_PAGING_REQUEST;
    successAction = AT.RECEIPTS_PAGING_SUCCESS;    
    errorAction = AT.RECEIPTS_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ReceiptsFilterAndPagingService());
    }
}

export class PayslipsFilterAndPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.PAYSLIP_PAGING_REQUEST;
    successAction = AT.PAYSLIP_PAGING_SUCCESS;    
    errorAction = AT.PAYSLIP_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PayslipsFilterAndPagingService());
    }
}

export class AllQuotationsBySearchTermAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_REQUEST;
    successAction = AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_SUCCESS;    
    errorAction = AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllQuotationsBySearchTermService());
    }
}

export class PendingQuotationsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_PENDING_QUOTATIONS_REQUEST;
    successAction = AT.GET_PENDING_QUOTATIONS_SUCCESS;    
    errorAction = AT.GET_PENDING_QUOTATIONS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PendingQuotationsService());
    }
}

export class AllQuotationItemsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_QUOTATION_ITEMS_REQUEST;
    successAction = AT.GET_ALL_QUOTATION_ITEMS_SUCCESS;    
    errorAction = AT.GET_ALL_QUOTATION_ITEMS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllQuotationItemsService());
    }
}

export class QuotationItemsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_ITEMS_BY_QUOTATION_REQUEST;
    successAction = AT.LIST_ITEMS_BY_QUOTATION_SUCCESS;    
    errorAction = AT.LIST_ITEMS_BY_QUOTATION_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationItemsService());
    }
}

export class GetCustomerExchangeWithPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.CUSTOMER_EXCHANGE_WITH_PAGING_REQUEST;
    successAction = AT.CUSTOMER_EXCHANGE_WITH_PAGING_SUCCESS;    
    errorAction = AT.CUSTOMER_EXCHANGE_WITH_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CustomerExchangeWithPagingService());
    }
}

export class LoadCustomerAndOwnedCarsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.FILTER_CUSTOMER_OWNED_CARS_REQUEST;
    successAction = AT.FILTER_CUSTOMER_OWNED_CARS_SUCCESS;    
    errorAction = AT.FILTER_CUSTOMER_OWNED_CARS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.SpecifyCustomerCarForQuotationService());
    }
}

export class QuotationsPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_QUOTATION_WITH_PAGING_REQUEST;
    successAction = AT.LIST_QUOTATION_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_QUOTATION_WITH_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationsPagingService());
    }
}

export class SpecifyQuotationNoteAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_QUOTATION_NOTE_REQUEST;
    successAction = AT.GET_UNIQUE_QUOTATION_NOTE_SUCCESS;    
    errorAction = AT.GET_UNIQUE_QUOTATION_NOTE_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationsPagingService());
    }
}

export class QuotationItemsGroupByParentCategoriesAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_REQUEST;
    successAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_SUCCESS;    
    errorAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationsPagingService());
    }
}

export class QuotationItemsGroupByParentServicesAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_REQUEST;
    successAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_SUCCESS;    
    errorAction = AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.QuotationItemsGroupByParentServiceTypeService());
    }
}
