import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CategoryReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CATEGORY_CREATE_REQUEST), (typeof AT.GET_SPECIFIC_CATEGORY_SUCCESS), (typeof AT.GET_SPECIFIC_CATEGORY_ERROR)>(action);

export const CategoriesWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_CATEGORIES_REQUEST), (typeof AT.GET_CATEGORIES_SUCCESS), (typeof AT.GET_CATEGORIES_ERROR)>(action);

export const ParentCategoriesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_PARENT_CATEGORIES_REQUEST), (typeof AT.GET_PARENT_CATEGORIES_SUCCESS), (typeof AT.GET_PARENT_CATEGORIES_ERROR)>(action);
