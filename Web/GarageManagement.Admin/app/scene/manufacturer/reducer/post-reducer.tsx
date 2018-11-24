import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ManufacturerCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.MANUFACTURER_CREATE_REQUEST), (typeof AT.MANUFACTURER_CREATE_SUCCESS), (typeof AT.MANUFACTURER_CREATE_ERROR)>(action);

export const ManufacturerEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.MANUFACTURER_EDIT_REQUEST), (typeof AT.MANUFACTURER_EDIT_SUCCESS), (typeof AT.MANUFACTURER_EDIT_ERROR)>(action);

export const ManufacturerDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.MANUFACTURER_DELETE_REQUEST), (typeof AT.MANUFACTURER_DELETE_SUCCESS), (typeof AT.MANUFACTURER_DELETE_ERROR)>(action);
