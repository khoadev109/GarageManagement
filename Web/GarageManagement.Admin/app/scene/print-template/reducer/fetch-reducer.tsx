import * as React from "react";
import { ActionType } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const GetPrintTemplateByStatusReducer = 
(action: any) => CoreReducer.Create<(typeof ActionType.GET_PRINT_TEMPLATE_REQUEST), (typeof ActionType.GET_PRINT_TEMPLATE_SUCCESS), (typeof ActionType.GET_PRINT_TEMPLATE_ERROR)>(action);