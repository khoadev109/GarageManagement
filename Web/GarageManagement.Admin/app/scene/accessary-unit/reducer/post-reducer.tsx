import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const AccessaryUnitCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_UNIT_CREATE_REQUEST), (typeof AT.ACCESSARY_UNIT_CREATE_SUCCESS), (typeof AT.ACCESSARY_UNIT_CREATE_ERROR)>(action);

export const AccessaryUnitEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_UNIT_EDIT_REQUEST), (typeof AT.ACCESSARY_UNIT_EDIT_SUCCESS), (typeof AT.ACCESSARY_UNIT_EDIT_ERROR)>(action);

export const AccessaryUnitDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.ACCESSARY_UNIT_DELETE_REQUEST), (typeof AT.ACCESSARY_UNIT_DELETE_SUCCESS), (typeof AT.ACCESSARY_UNIT_DELETE_ERROR)>(action);
