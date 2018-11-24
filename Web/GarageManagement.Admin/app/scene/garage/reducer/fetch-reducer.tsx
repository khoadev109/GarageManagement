import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const GarageInformationReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_GARAGE_INFORMATION_REQUEST), (typeof AT.GET_GARAGE_INFORMATION_SUCCESS), (typeof AT.GET_GARAGE_INFORMATION_ERROR)>(action);
