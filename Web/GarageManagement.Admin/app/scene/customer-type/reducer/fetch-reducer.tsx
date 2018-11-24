import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CustomerTypeReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_CUSTOMER_TYPE_REQUEST), (typeof AT.GET_UNIQUE_CUSTOMER_TYPE_SUCCESS), (typeof AT.GET_UNIQUE_CUSTOMER_TYPE_ERROR)>(action);

export const CustomersTypeWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_REQUEST), (typeof AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_SUCCESS), (typeof AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_ERROR)>(action);
