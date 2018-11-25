import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const QuotationCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_CREATE_REQUEST), (typeof AT.QUOTATION_CREATE_SUCCESS), (typeof AT.QUOTATION_CREATE_ERROR)>(action);

export const QuotationEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_UPDATE_REQUEST), (typeof AT.QUOTATION_UPDATE_SUCCESS), (typeof AT.QUOTATION_UPDATE_ERROR)>(action);

export const QuotationEditOnlyQuotationInfoReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_REQUEST), (typeof AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_SUCCESS), (typeof AT.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_ERROR)>(action);

export const QuotationChangeStatusReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_CHANGE_STATUS_REQUEST), (typeof AT.QUOTATION_CHANGE_STATUS_SUCCESS), (typeof AT.QUOTATION_CHANGE_STATUS_ERROR)>(action);

export const QuotationItemCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_ITEM_CREATE_REQUEST), (typeof AT.QUOTATION_ITEM_CREATE_SUCCESS), (typeof AT.QUOTATION_ITEM_CREATE_ERROR)>(action);

export const QuotationItemEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_ITEM_EDIT_REQUEST), (typeof AT.QUOTATION_ITEM_EDIT_SUCCESS), (typeof AT.QUOTATION_ITEM_EDIT_ERROR)>(action);

export const QuotationItemDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_ITEM_DELETE_REQUEST), (typeof AT.QUOTATION_ITEM_DELETE_SUCCESS), (typeof AT.QUOTATION_ITEM_DELETE_ERROR)>(action);

export const QuotationMultipleItemCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_MULTIPLE_ITEM_CREATE_REQUEST), (typeof AT.QUOTATION_MULTIPLE_ITEM_CREATE_SUCCESS), (typeof AT.QUOTATION_MULTIPLE_ITEM_CREATE_ERROR)>(action);

export const QuotationEmployeesUpdateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_UPDATE_EMPLOYEES_REQUEST), (typeof AT.QUOTATION_UPDATE_EMPLOYEES_SUCCESS), (typeof AT.QUOTATION_UPDATE_EMPLOYEES_ERROR)>(action);

export const QuotationItemsUpdateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_UPDATE_ITEMS_REQUEST), (typeof AT.QUOTATION_UPDATE_ITEMS_SUCCESS), (typeof AT.QUOTATION_UPDATE_ITEMS_ERROR)>(action);

export const ReceiptsCreateOrUpdateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.RECEIPTS_CREATE_OR_UPDATE_REQUEST), (typeof AT.RECEIPTS_CREATE_OR_UPDATE_SUCCESS), (typeof AT.RECEIPTS_CREATE_OR_UPDATE_ERROR)>(action);

export const PaySlipCreateOrUpdateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.PAYSLIP_CREATE_OR_UPDATE_REQUEST), (typeof AT.PAYSLIP_CREATE_OR_UPDATE_SUCCESS), (typeof AT.PAYSLIP_CREATE_OR_UPDATE_ERROR)>(action);

export const QuotationNoteUpdateSpecifyStepReducer = 
(action: any) => CoreReducer.Create<(typeof AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_REQUEST), (typeof AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_SUCCESS), (typeof AT.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_ERROR)>(action);
