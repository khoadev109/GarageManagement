import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class QuotationCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_CREATE_REQUEST;
    successAction = AT.QUOTATION_CREATE_SUCCESS;    
    errorAction = AT.QUOTATION_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationCreateService());
    }
}

export class QuotationEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_UPDATE_REQUEST;
    successAction = AT.QUOTATION_UPDATE_SUCCESS;    
    errorAction = AT.QUOTATION_UPDATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationEditService());
    }
}

export class QuotationEditOnlyQuotationInfoAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_REQUEST;
    successAction = AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_SUCCESS;    
    errorAction = AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationEditOnlyQuotationInfoService());
    }
}

export class QuotationChangeStatusAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_CHANGE_STATUS_REQUEST;
    successAction = AT.QUOTATION_CHANGE_STATUS_SUCCESS;    
    errorAction = AT.QUOTATION_CHANGE_STATUS_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationChangeStatusService());
    }
}

export class QuotationItemCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_ITEM_CREATE_REQUEST;
    successAction = AT.QUOTATION_ITEM_CREATE_SUCCESS;    
    errorAction = AT.QUOTATION_ITEM_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationItemCreateService());
    }
}

export class QuotationItemEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_ITEM_EDIT_REQUEST;
    successAction = AT.QUOTATION_ITEM_EDIT_SUCCESS;    
    errorAction = AT.QUOTATION_ITEM_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationItemEditService());
    }
}

export class QuotationItemDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_ITEM_DELETE_REQUEST;
    successAction = AT.QUOTATION_ITEM_DELETE_SUCCESS;    
    errorAction = AT.QUOTATION_ITEM_DELETE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationItemDeleteService());
    }
}

export class QuotationMultipleItemCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_MULTIPLE_ITEM_CREATE_REQUEST;
    successAction = AT.QUOTATION_MULTIPLE_ITEM_CREATE_SUCCESS;    
    errorAction = AT.QUOTATION_MULTIPLE_ITEM_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationMultipleItemCreateService());
    }
}

export class QuotationItemsUpdateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_UPDATE_ITEMS_REQUEST;
    successAction = AT.QUOTATION_UPDATE_ITEMS_SUCCESS;    
    errorAction = AT.QUOTATION_UPDATE_ITEMS_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationUpdateItemsService());
    }
}

export class QuotationEmployeesUpdateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_UPDATE_EMPLOYEES_REQUEST;
    successAction = AT.QUOTATION_UPDATE_EMPLOYEES_SUCCESS;    
    errorAction = AT.QUOTATION_UPDATE_EMPLOYEES_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationUpdateItemsService());
    }
}

export class ReceiptsCreateOrUpdateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.RECEIPTS_CREATE_OR_UPDATE_REQUEST;
    successAction = AT.RECEIPTS_CREATE_OR_UPDATE_SUCCESS;    
    errorAction = AT.RECEIPTS_CREATE_OR_UPDATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ReceiptsCreateOrUpdateService());
    }
}

export class PaySlipCreateOrUpdateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.PAYSLIP_CREATE_OR_UPDATE_REQUEST;
    successAction = AT.PAYSLIP_CREATE_OR_UPDATE_SUCCESS;    
    errorAction = AT.PAYSLIP_CREATE_OR_UPDATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.PaySlipCreateOrUpdateService());
    }
}

export class QuotationNoteUpdateSpecifyStepAction extends BaseAction implements IPostAction {
    
    requestAction = AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_REQUEST;
    successAction = AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_SUCCESS;    
    errorAction = AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.QuotationNoteUpdateSpecifyStepService());
    }
}
