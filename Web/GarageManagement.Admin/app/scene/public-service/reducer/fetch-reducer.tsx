import * as React from "react";
import { ActionType } from "../action/action-type";
import * as CoreReducer from "core/redux/root-reducer";

export const PublicServReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_SPECIFY_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_SPECIFY_SERVICE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const AllPublicServReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.GET_ALL_SERVICES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.GET_ALL_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.GET_ALL_SERVICES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}


export const PublicServsWithPagingReducer = (state = CoreReducer.ResponseState, action: any) => {
    switch (action.type) {
        case ActionType.LIST_SERVICES_WITH_PAGING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionType.LIST_SERVICES_WITH_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                target: action.result
            }
        case ActionType.LIST_SERVICES_WITH_PAGING_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}
