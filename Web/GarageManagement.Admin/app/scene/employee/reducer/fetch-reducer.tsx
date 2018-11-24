import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const EmployeeReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_EMPLOYEE_REQUEST), (typeof AT.GET_UNIQUE_EMPLOYEE_SUCCESS), (typeof AT.GET_UNIQUE_EMPLOYEE_ERROR)>(action);

export const AllEmployeesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_EMPLOYEES_REQUEST), (typeof AT.GET_ALL_EMPLOYEES_SUCCESS), (typeof AT.GET_ALL_EMPLOYEES_ERROR)>(action);

export const EmployeesWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_EMPLOYEES_WITH_PAGING_REQUEST), (typeof AT.LIST_EMPLOYEES_WITH_PAGING_SUCCESS), (typeof AT.LIST_EMPLOYEES_WITH_PAGING_ERROR)>(action);
