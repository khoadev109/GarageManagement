import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CategoryCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CATEGORY_CREATE_REQUEST), (typeof AT.CATEGORY_CREATE_SUCCESS), (typeof AT.CATEGORY_CREATE_ERROR)>(action);

export const CategoryEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CATEGORY_EDIT_REQUEST), (typeof AT.CATEGORY_EDIT_SUCCESS), (typeof AT.CATEGORY_EDIT_ERROR)>(action);

export const CategoryDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CATEGORY_DELETE_REQUEST), (typeof AT.CATEGORY_DELETE_SUCCESS), (typeof AT.CATEGORY_DELETE_ERROR)>(action);
