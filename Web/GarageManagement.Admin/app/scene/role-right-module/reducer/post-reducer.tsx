import * as React from "react";
import { ActionType } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const SavePermissionReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.SAVE_PERMISSION_REQUEST), (typeof ActionType.SAVE_PERMISSION_SUCCESS), (typeof ActionType.SAVE_PERMISSION_ERROR)>(action);