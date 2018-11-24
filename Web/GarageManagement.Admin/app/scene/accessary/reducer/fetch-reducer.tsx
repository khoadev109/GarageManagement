import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const AccessaryReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_ACCESSARY_REQUEST), (typeof AT.GET_UNIQUE_ACCESSARY_SUCCESS), (typeof AT.GET_UNIQUE_ACCESSARY_ERROR)>(action);

export const AllAccessariesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_ACCESSARIES_REQUEST), (typeof AT.GET_ALL_ACCESSARIES_SUCCESS), (typeof AT.GET_ALL_ACCESSARIES_ERROR)>(action);

export const AccessariesWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_ACCESSARIES_WITH_PAGING_REQUEST), (typeof AT.LIST_ACCESSARIES_WITH_PAGING_SUCCESS), (typeof AT.LIST_ACCESSARIES_WITH_PAGING_ERROR)>(action);
