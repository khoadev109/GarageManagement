import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const YearCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.YEAR_CREATE_REQUEST), (typeof AT.YEAR_CREATE_SUCCESS), (typeof AT.YEAR_CREATE_ERROR)>(action);

export const YearEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.YEAR_EDIT_REQUEST), (typeof AT.YEAR_EDIT_SUCCESS), (typeof AT.YEAR_EDIT_ERROR)>(action);

export const YearDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.YEAR_DELETE_REQUEST), (typeof AT.YEAR_DELETE_SUCCESS), (typeof AT.YEAR_DELETE_ERROR)>(action);
