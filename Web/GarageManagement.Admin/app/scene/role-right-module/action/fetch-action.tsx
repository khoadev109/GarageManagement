import * as redux from "redux";
import * as FetchService from "../service/fetch-service";

import { ActionType } from "./action-type";
import { BaseAction, IFetchAction } from "core/redux/action";

export class GetByUserAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_PERMISSION_BY_USER_REQUEST;
    successAction = ActionType.GET_PERMISSION_BY_USER_SUCCESS;
    errorAction = ActionType.GET_PERMISSION_BY_USER_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GetByUserService());
    }
}

export class GetByRoleAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_PERMISSION_BY_ROLE_REQUEST;
    successAction = ActionType.GET_PERMISSION_BY_ROLE_SUCCESS;
    errorAction = ActionType.GET_PERMISSION_BY_ROLE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GetByRoleService());
    }
}

export class GetRoleAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_ROLE_REQUEST;
    successAction = ActionType.GET_ROLE_SUCCESS;
    errorAction = ActionType.GET_ROLE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GetRoleService());
    }
}

export class GetUserAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_USER_REQUEST;
    successAction = ActionType.GET_USER_SUCCESS;
    errorAction = ActionType.GET_USER_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GetUserService());
    }
}

export class GetModuleAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_MODULE_REQUEST;
    successAction = ActionType.GET_MODULE_SUCCESS;
    errorAction = ActionType.GET_MODULE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GetModuleService());
    }
}