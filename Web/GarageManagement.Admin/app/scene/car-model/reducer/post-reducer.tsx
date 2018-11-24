import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CarModelCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_MODEL_CREATE_REQUEST), (typeof AT.CAR_MODEL_CREATE_SUCCESS), (typeof AT.CAR_MODEL_CREATE_ERROR)>(action);

export const CarModelEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_MODEL_EDIT_REQUEST), (typeof AT.CAR_MODEL_EDIT_SUCCESS), (typeof AT.CAR_MODEL_EDIT_ERROR)>(action);

export const CarModelDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_MODEL_DELETE_REQUEST), (typeof AT.CAR_MODEL_DELETE_SUCCESS), (typeof AT.CAR_MODEL_DELETE_ERROR)>(action);
