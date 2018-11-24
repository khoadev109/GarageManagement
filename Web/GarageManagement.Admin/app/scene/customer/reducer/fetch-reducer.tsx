import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CustomerReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_CUSTOMER_REQUEST), (typeof AT.GET_UNIQUE_CUSTOMER_SUCCESS), (typeof AT.GET_UNIQUE_CUSTOMER_ERROR)>(action);

export const CustomersWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_CUSTOMERS_WITH_PAGING_REQUEST), (typeof AT.LIST_CUSTOMERS_WITH_PAGING_SUCCESS), (typeof AT.LIST_CUSTOMERS_WITH_PAGING_ERROR)>(action);
