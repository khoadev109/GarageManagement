import { ActionType } from "./action-type";
import { IBaseAction } from "core/redux/action";
import * as PostService from "../service/post-service";

export class QuotationCreateAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationCreateService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_CREATE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_CREATE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_CREATE_ERROR, error } 
    }
}

export class QuotationEditAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationEditService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_UPDATE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_UPDATE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_UPDATE_ERROR, error } 
    }
}

export class QuotationEditOnlyQuotationInfoAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationEditOnlyQuotationInfoService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_ERROR, error } 
    }
}

export class QuotationChangeStatusAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationChangeStatusService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_CHANGE_STATUS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_CHANGE_STATUS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_CHANGE_STATUS_ERROR, error } 
    }
}

export class QuotationItemCreateAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationItemCreateService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_ITEM_CREATE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_ITEM_CREATE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_ITEM_CREATE_ERROR, error } 
    }
}

export class QuotationItemEditAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationItemEditService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_ITEM_EDIT_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_ITEM_EDIT_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_ITEM_EDIT_ERROR, error } 
    }
}

export class QuotationItemDeleteAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationItemDeleteService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_ITEM_DELETE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_ITEM_DELETE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_ITEM_DELETE_ERROR, error } 
    }
}

export class QuotationMultipleItemCreateAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationMultipleItemCreateService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_ERROR, error } 
    }
}

export class QuotationItemsUpdateAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationUpdateItemsService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_UPDATE_ITEMS_ERROR, error } 
    }
}

export class QuotationEmployeesUpdateAction implements IBaseAction {
    updateEmployees(quotationId: string, employeeIds: any) {
        return (dispatch: any) => {
            dispatch(this.request(employeeIds));
            
            let service = new PostService.QuotationUpdateEmployeeService();
            
            var request = { 
                QuotationId: quotationId, 
                EmployeeIds: employeeIds 
            };

            service.execute(request).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_UPDATE_EMPLOYEES_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_UPDATE_EMPLOYEES_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_UPDATE_EMPLOYEES_ERROR, error } 
    }
}

export class ReceiptsCreateOrUpdateAction implements IBaseAction {
    createOrUpdate(receiptsBillId: number, receipts: any) {
        return (dispatch: any) => {
            dispatch(this.request(receipts));
            
            let service = new PostService.ReceiptsCreateOrUpdateService();
            var request = { Id: receiptsBillId, Receipts: receipts };

            service.execute(request).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.RECEIPTS_CREATE_OR_UPDATE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.RECEIPTS_CREATE_OR_UPDATE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.RECEIPTS_CREATE_OR_UPDATE_ERROR, error } 
    }
}

export class PaySlipCreateOrUpdateAction implements IBaseAction {
    createOrUpdate(paySlipBillId: number, paySlip: any) {
        return (dispatch: any) => {
            dispatch(this.request(paySlip));
            
            let service = new PostService.PaySlipCreateOrUpdateService();
            var request = { Id: paySlipBillId, PaySlip: paySlip };

            service.execute(request).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.PAYSLIP_CREATE_OR_UPDATE_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.PAYSLIP_CREATE_OR_UPDATE_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.PAYSLIP_CREATE_OR_UPDATE_ERROR, error } 
    }
}

export class QuotationNoteUpdateSpecifyStepAction implements IBaseAction {
    post(entry: any) {
        return (dispatch: any) => {
            dispatch(this.request(entry));
            
            let service = new PostService.QuotationNoteUpdateSpecifyStepService();
            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }
    
    request(entry: any) { 
        return { type: ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_REQUEST, entry } 
    }

    success(result: any) {
        return { type: ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_SUCCESS, result }
    }
    
    failure(error: Error) { 
        return { type: ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_ERROR, error } 
    }
}
