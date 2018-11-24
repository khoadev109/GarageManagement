import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ServiceTypeCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_TYPE_CREATE_REQUEST), (typeof AT.SERVICE_TYPE_CREATE_SUCCESS), (typeof AT.SERVICE_TYPE_CREATE_ERROR)>(action);

export const ServiceTypeEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_TYPE_EDIT_REQUEST), (typeof AT.SERVICE_TYPE_EDIT_SUCCESS), (typeof AT.SERVICE_TYPE_EDIT_ERROR)>(action);

export const ServiceTypeDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_TYPE_DELETE_REQUEST), (typeof AT.SERVICE_TYPE_DELETE_SUCCESS), (typeof AT.SERVICE_TYPE_DELETE_ERROR)>(action);
