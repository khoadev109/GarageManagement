import * as React from "react";
import { ActionType } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const AddOrUpdatePrintTemplateReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_REQUEST), (typeof ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_SUCCESS), (typeof ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_ERROR)>(action);