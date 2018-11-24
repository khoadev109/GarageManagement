import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ManufacturerReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_MANUFACTURER_REQUEST), (typeof AT.GET_UNIQUE_MANUFACTURER_SUCCESS), (typeof AT.GET_UNIQUE_MANUFACTURER_ERROR)>(action);

export const AllManufacturerReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_MANUFACTURERS_REQUEST), (typeof AT.GET_ALL_MANUFACTURERS_SUCCESS), (typeof AT.GET_ALL_MANUFACTURERS_ERROR)>(action);

export const ManufacturersWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_MANUFACTURERS_WITH_PAGING_REQUEST), (typeof AT.LIST_MANUFACTURERS_WITH_PAGING_SUCCESS), (typeof AT.LIST_MANUFACTURERS_WITH_PAGING_ERROR)>(action);
