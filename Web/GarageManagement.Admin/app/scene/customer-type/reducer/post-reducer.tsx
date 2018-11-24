import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CustomerTypeCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_TYPE_CREATE_REQUEST), (typeof AT.CUSTOMER_TYPE_CREATE_SUCCESS), (typeof AT.CUSTOMER_TYPE_CREATE_ERROR)>(action);

export const CustomerTypeEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_TYPE_EDIT_REQUEST), (typeof AT.CUSTOMER_TYPE_EDIT_SUCCESS), (typeof AT.CUSTOMER_TYPE_EDIT_ERROR)>(action);

export const CustomerTypeDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_TYPE_DELETE_REQUEST), (typeof AT.CUSTOMER_TYPE_DELETE_SUCCESS), (typeof AT.CUSTOMER_TYPE_DELETE_ERROR)>(action);
