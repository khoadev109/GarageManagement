import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const EmployeeCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.EMPLOYEE_CREATE_REQUEST), (typeof AT.EMPLOYEE_CREATE_SUCCESS), (typeof AT.EMPLOYEE_CREATE_ERROR)>(action);

export const EmployeeEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.EMPLOYEE_EDIT_REQUEST), (typeof AT.EMPLOYEE_EDIT_SUCCESS), (typeof AT.EMPLOYEE_EDIT_ERROR)>(action);

export const EmployeeDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.EMPLOYEE_DELETE_REQUEST), (typeof AT.EMPLOYEE_DELETE_SUCCESS), (typeof AT.EMPLOYEE_DELETE_ERROR)>(action);
