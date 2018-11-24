import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class EmployeeAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_EMPLOYEE_REQUEST;
    successAction = AT.GET_UNIQUE_EMPLOYEE_SUCCESS;    
    errorAction = AT.GET_UNIQUE_EMPLOYEE_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.EmployeeService());
    }
}

export class AllEmployeesAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_EMPLOYEES_REQUEST;
    successAction = AT.GET_ALL_EMPLOYEES_SUCCESS;    
    errorAction = AT.GET_ALL_EMPLOYEES_ERROR;

    fetch(entry?: any) {
        this.dispatching(entry, new FetchService.AllEmployeesService());
    }
}

export class EmployeesPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_EMPLOYEES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_EMPLOYEES_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_EMPLOYEES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.EmployeesFilterAndPagingService());
    }
}
