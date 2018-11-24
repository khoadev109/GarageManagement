import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ServiceUnitCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_UNIT_CREATE_REQUEST), (typeof AT.SERVICE_UNIT_CREATE_SUCCESS), (typeof AT.SERVICE_UNIT_CREATE_ERROR)>(action);

export const ServiceUnitEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_UNIT_EDIT_REQUEST), (typeof AT.SERVICE_UNIT_EDIT_SUCCESS), (typeof AT.SERVICE_UNIT_EDIT_ERROR)>(action);

export const ServiceUnitDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.SERVICE_UNIT_DELETE_REQUEST), (typeof AT.SERVICE_UNIT_DELETE_SUCCESS), (typeof AT.SERVICE_UNIT_DELETE_ERROR)>(action);
