import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CustomerCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_CREATE_REQUEST), (typeof AT.CUSTOMER_CREATE_SUCCESS), (typeof AT.CUSTOMER_CREATE_ERROR)>(action);

export const CustomerEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_EDIT_REQUEST), (typeof AT.CUSTOMER_EDIT_SUCCESS), (typeof AT.CUSTOMER_EDIT_ERROR)>(action);

export const CustomerDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_DELETE_REQUEST), (typeof AT.CUSTOMER_DELETE_SUCCESS), (typeof AT.CUSTOMER_DELETE_ERROR)>(action);
