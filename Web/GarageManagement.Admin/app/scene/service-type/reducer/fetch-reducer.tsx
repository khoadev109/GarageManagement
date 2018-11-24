import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ServiceTypeReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_SERVICE_TYPE_REQUEST), (typeof AT.GET_UNIQUE_SERVICE_TYPE_SUCCESS), (typeof AT.GET_UNIQUE_SERVICE_TYPE_ERROR)>(action);

export const ParentServiceTypesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_PARENT_SERVICE_TYPES_REQUEST), (typeof AT.GET_PARENT_SERVICE_TYPES_SUCCESS), (typeof AT.GET_PARENT_SERVICE_TYPES_ERROR)>(action);

export const ServiceTypeWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_SERVICE_TYPES_WITH_PAGING_REQUEST), (typeof AT.LIST_SERVICE_TYPES_WITH_PAGING_SUCCESS), (typeof AT.LIST_SERVICE_TYPES_WITH_PAGING_ERROR)>(action);
