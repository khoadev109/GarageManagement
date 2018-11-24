import { ActionType } from "./action-type";
import { IBaseAction } from "core/redux/action";
import * as FetchService from "../service/fetch-service";

export class QuotationAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_SPECIFY_QUOTATION_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_ERROR, error } 
    }
}

export class AllQuotationAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.AllQuotationInfoService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_ERROR, error }
    }
}

export class QuotationItemAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationItemService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_ITEM_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_SPECIFY_QUOTATION_ITEM_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_ITEM_ERROR, error } 
    }
}

export class NewQuotationItemAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.NewQuotationItemService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.INITIALIZE_NEW_QUOTATION_ITEM_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.INITIALIZE_NEW_QUOTATION_ITEM_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.INITIALIZE_NEW_QUOTATION_ITEM_ERROR, error } 
    }
}

export class QuotationEmployeesAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.EmployeesQuotationService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_EMPLOYEES_BY_QUOTATION_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_EMPLOYEES_BY_QUOTATION_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_EMPLOYEES_BY_QUOTATION_ERROR, error } 
    }
}

export class ReceiptsAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.ReceiptsQuotationService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_SEPECIFY_RECEIPT_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_SEPECIFY_RECEIPT_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_SEPECIFY_RECEIPT_ERROR, error }
    }
}

export class PaySlipAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.PaySlipQuotationService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_SEPECIFY_PAYSLIP_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_SEPECIFY_PAYSLIP_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_SEPECIFY_PAYSLIP_ERROR, error }
    }
}

export class ReceiptsFilterAndPagingAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.ReceiptsFilterAndPagingService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.RECEIPTS_PAGING_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.RECEIPTS_PAGING_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.RECEIPTS_PAGING_ERROR, error }
    }
}

export class PayslipsFilterAndPagingAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.PayslipsFilterAndPagingService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.PAYSLIP_PAGING_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.PAYSLIP_PAGING_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.PAYSLIP_PAGING_ERROR, error }
    }
}

export class AllQuotationsBySearchTermAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.AllQuotationsBySearchTermService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_ERROR, error } 
    }
}

export class PendingQuotationsAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.PendingQuotationsService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_PENDING_QUOTATIONS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_PENDING_QUOTATIONS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_PENDING_QUOTATIONS_ERROR, error } 
    }
}

export class AllQuotationItemsAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.AllQuotationItemsService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_ALL_QUOTATION_ITEMS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_ALL_QUOTATION_ITEMS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_ALL_QUOTATION_ITEMS_ERROR, error } 
    }
}

export class QuotationItemsAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationItemsService();
            service.execute(entry.quotationId, entry.pagingParameters).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.LIST_ITEMS_BY_QUOTATION_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.LIST_ITEMS_BY_QUOTATION_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.LIST_ITEMS_BY_QUOTATION_ERROR, error } 
    }
}

export class GetCustomerExchangeWithPagingAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.CustomerExchangeWithPagingService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_ERROR, error } 
    }
}

export class LoadCustomerAndOwnedCarsAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.SpecifyCustomerCarForQuotationService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.FILTER_CUSTOMER_OWNED_CARS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.FILTER_CUSTOMER_OWNED_CARS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.FILTER_CUSTOMER_OWNED_CARS_ERROR, error } 
    }
}

export class QuotationsPagingAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationsPagingService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.LIST_QUOTATION_WITH_PAGING_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.LIST_QUOTATION_WITH_PAGING_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.LIST_QUOTATION_WITH_PAGING_ERROR, error } 
    }
}

export class SpecifyQuotationNoteAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationNoteService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_NOTE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_SPECIFY_QUOTATION_NOTE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_SPECIFY_QUOTATION_NOTE_ERROR, error } 
    }
}

export class QuotationItemsGroupByParentCategoriesAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationItemsGroupByParentCategoriesService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_ERROR, error } 
    }
}

export class QuotationItemsGroupByParentServicesAction implements IBaseAction {
    fetch(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new FetchService.QuotationItemsGroupByParentServiceTypeService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_ERROR, error }
    }
}
