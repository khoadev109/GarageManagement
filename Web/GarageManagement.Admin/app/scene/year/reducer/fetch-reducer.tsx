import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const YearReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_YEAR_REQUEST), (typeof AT.GET_UNIQUE_YEAR_SUCCESS), (typeof AT.GET_UNIQUE_YEAR_ERROR)>(action);

export const AllYearReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_YEARS_REQUEST), (typeof AT.GET_ALL_YEARS_SUCCESS), (typeof AT.GET_ALL_YEARS_ERROR)>(action);

export const YearsWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_YEARS_WITH_PAGING_REQUEST), (typeof AT.LIST_YEARS_WITH_PAGING_SUCCESS), (typeof AT.LIST_YEARS_WITH_PAGING_ERROR)>(action);
