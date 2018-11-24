import * as React from "react";
import { ActionType } from "../action/action-type";
import * as CoreReducer from "core/redux/root-reducer";

export const QuotationReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_QUOTATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SPECIFY_QUOTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SPECIFY_QUOTATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const AllQuotationReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_ALL_SPECIFIED_QUOTATION_INFO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_QUOTATION_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SPECIFY_QUOTATION_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SPECIFY_QUOTATION_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const NewQuotationItemReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.INITIALIZE_NEW_QUOTATION_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.INITIALIZE_NEW_QUOTATION_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.INITIALIZE_NEW_QUOTATION_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationEmployeesReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_EMPLOYEES_BY_QUOTATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_EMPLOYEES_BY_QUOTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_EMPLOYEES_BY_QUOTATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const ReceiptsReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SEPECIFY_RECEIPT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SEPECIFY_RECEIPT_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SEPECIFY_RECEIPT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const PaySlipReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SEPECIFY_PAYSLIP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SEPECIFY_PAYSLIP_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SEPECIFY_PAYSLIP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const ReceiptsFilterAndPagingReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.RECEIPTS_PAGING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.RECEIPTS_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.RECEIPTS_PAGING_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const PayslipsFilterAndPagingReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.PAYSLIP_PAGING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.PAYSLIP_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.PAYSLIP_PAGING_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const AllQuotationsBySearchTermReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const PendingQuotationsReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_PENDING_QUOTATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_PENDING_QUOTATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_PENDING_QUOTATIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const AllQuotationItemsReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_ALL_QUOTATION_ITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_ALL_QUOTATION_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_ALL_QUOTATION_ITEMS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemsReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.LIST_ITEMS_BY_QUOTATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.LIST_ITEMS_BY_QUOTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.LIST_ITEMS_BY_QUOTATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const GetCustomerExchangeWithPagingReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.CUSTOMER_EXCHANGE_WITH_PAGING_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const CustomerAndOwnedCarsReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.FILTER_CUSTOMER_OWNED_CARS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.FILTER_CUSTOMER_OWNED_CARS_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.FILTER_CUSTOMER_OWNED_CARS_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationsPagingReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.LIST_QUOTATION_WITH_PAGING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.LIST_QUOTATION_WITH_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.LIST_QUOTATION_WITH_PAGING_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const SpecifyQuotationNoteReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_QUOTATION_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SPECIFY_QUOTATION_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SPECIFY_QUOTATION_NOTE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemsGroupByParentCategoriesReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}

export const QuotationItemsGroupByParentServiceTypesReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_ERROR:
            return {
                ...state,
                loading: false, 
                error: action.error
            }
        default:
            return state
    }
}
