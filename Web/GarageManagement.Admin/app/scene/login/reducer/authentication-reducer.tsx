import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const LoginReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LOGIN_REQUEST), (typeof AT.LOGIN_SUCCESS), (typeof AT.LOGIN_ERROR)>(action);

export const LogoutReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LOGOUT_REQUEST), (typeof AT.LOGOUT_SUCCESS), (typeof AT.LOGOUT_ERROR)>(action);
