import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const AccessaryCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_CREATE_REQUEST), (typeof AT.ACCESSARY_CREATE_SUCCESS), (typeof AT.ACCESSARY_CREATE_ERROR)>(action);

export const AccessaryEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_EDIT_REQUEST), (typeof AT.ACCESSARY_EDIT_SUCCESS), (typeof AT.ACCESSARY_EDIT_ERROR)>(action);

export const AccessaryDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_DELETE_REQUEST), (typeof AT.ACCESSARY_DELETE_SUCCESS), (typeof AT.ACCESSARY_DELETE_ERROR)>(action);
