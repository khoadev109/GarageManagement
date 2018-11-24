import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CarCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_CREATE_REQUEST), (typeof AT.CAR_CREATE_REQUEST), (typeof AT.CAR_CREATE_REQUEST)>(action);

export const CarEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_EDIT_REQUEST), (typeof AT.CAR_EDIT_SUCCESS), (typeof AT.CAR_EDIT_ERROR)>(action);

export const CarDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CAR_DELETE_REQUEST), (typeof AT.CAR_DELETE_SUCCESS), (typeof AT.CAR_DELETE_ERROR)>(action);
