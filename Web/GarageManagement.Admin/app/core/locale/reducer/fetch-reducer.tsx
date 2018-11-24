import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const ProvincesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_PROVICES_REQUEST), (typeof AT.GET_PROVICES_SUCCESS), (typeof AT.GET_PROVICES_ERROR)>(action);

export const DistrictsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_DISTRICTS_REQUEST), (typeof AT.GET_DISTRICTS_SUCCESS), (typeof AT.GET_DISTRICTS_ERROR)>(action);

export const WardsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_WARDS_REQUEST), (typeof AT.GET_WARDS_SUCCESS), (typeof AT.GET_WARDS_ERROR)>(action);
