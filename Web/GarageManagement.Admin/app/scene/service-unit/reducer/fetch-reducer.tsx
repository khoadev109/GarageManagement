import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ServiceUnitReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_SERVICE_UNIT_REQUEST), (typeof AT.GET_UNIQUE_SERVICE_UNIT_SUCCESS), (typeof AT.GET_UNIQUE_SERVICE_UNIT_ERROR)>(action);

export const ServiceUnitWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_SERVICE_UNITS_WITH_PAGING_REQUEST), (typeof AT.LIST_SERVICE_UNITS_WITH_PAGING_SUCCESS), (typeof AT.LIST_SERVICE_UNITS_WITH_PAGING_ERROR)>(action);
