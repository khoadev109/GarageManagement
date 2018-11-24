import * as React from "react";
import { ActionType } from "../action/action-type";
import * as CoreReducer from "core/redux/root-reducer";

export const QuotationCreateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_CREATE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationEditReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_UPDATE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationEditOnlyQuotationInfoReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_UPDATE_ONLY_QUOTATION_INFO_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationChangeStatusReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_CHANGE_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_CHANGE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_CHANGE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemCreateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_ITEM_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_ITEM_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_ITEM_CREATE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemEditReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_ITEM_EDIT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_ITEM_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_ITEM_EDIT_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemDeleteReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_ITEM_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_ITEM_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_ITEM_DELETE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationMultipleItemCreateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_MULTIPLE_ITEM_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_MULTIPLE_ITEM_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_MULTIPLE_ITEM_CREATE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationEmployeesUpdateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_UPDATE_EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_UPDATE_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_UPDATE_EMPLOYEES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemsUpdateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_UPDATE_ITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_UPDATE_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_UPDATE_ITEMS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const ReceiptsCreateOrUpdateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.RECEIPTS_CREATE_OR_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.RECEIPTS_CREATE_OR_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.RECEIPTS_CREATE_OR_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const PaySlipCreateOrUpdateReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.PAYSLIP_CREATE_OR_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.PAYSLIP_CREATE_OR_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.PAYSLIP_CREATE_OR_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationNoteUpdateSpecifyStepReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.QUOTATION_NOTE_UPDATE_SPECIFY_STEP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}