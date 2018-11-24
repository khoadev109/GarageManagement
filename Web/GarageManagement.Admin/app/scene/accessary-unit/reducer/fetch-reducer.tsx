import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const AccessaryUnitReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_ACCESSARY_UNIT_REQUEST), (typeof AT.GET_UNIQUE_ACCESSARY_UNIT_SUCCESS), (typeof AT.GET_UNIQUE_ACCESSARY_UNIT_ERROR)>(action);

export const AccessaryUnitWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_ACCESSARY_UNITS_WITH_PAGING_REQUEST), (typeof AT.LIST_ACCESSARY_UNITS_WITH_PAGING_SUCCESS), (typeof AT.LIST_ACCESSARY_UNITS_WITH_PAGING_ERROR)>(action);
