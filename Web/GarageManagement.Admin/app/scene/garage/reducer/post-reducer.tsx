import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const GarageUpdateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GARAGE_UPDATE_REQUEST), (typeof AT.GARAGE_UPDATE_SUCCESS), (typeof AT.GARAGE_UPDATE_ERROR)>(action);
