import * as React from "react";
import { ActionType } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const GetPermissionByUserReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_PERMISSION_BY_USER_REQUEST), (typeof ActionType.GET_PERMISSION_BY_USER_SUCCESS), (typeof ActionType.GET_PERMISSION_BY_USER_ERROR)>(action);

export const GetPermissionByRoleReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_PERMISSION_BY_ROLE_REQUEST), (typeof ActionType.GET_PERMISSION_BY_ROLE_SUCCESS), (typeof ActionType.GET_PERMISSION_BY_ROLE_ERROR)>(action);

export const GetUserReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_USER_REQUEST), (typeof ActionType.GET_USER_SUCCESS), (typeof ActionType.GET_USER_ERROR)>(action);

export const GetRoleReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_ROLE_REQUEST), (typeof ActionType.GET_ROLE_SUCCESS), (typeof ActionType.GET_ROLE_ERROR)>(action);

export const GetModuleReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_MODULE_REQUEST), (typeof ActionType.GET_MODULE_SUCCESS), (typeof ActionType.GET_MODULE_ERROR)>(action);