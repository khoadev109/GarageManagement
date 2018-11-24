import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CarReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_CAR_REQUEST), (typeof AT.GET_UNIQUE_CAR_SUCCESS), (typeof AT.GET_UNIQUE_CAR_ERROR)>(action);

export const OwnedCarsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_OWNED_CARS_REQUEST), (typeof AT.GET_OWNED_CARS_SUCCESS), (typeof AT.GET_OWNED_CARS_ERROR)>(action);

export const CarByCustomerReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_CAR_BY_CUSTOMER_REQUEST), (typeof AT.GET_CAR_BY_CUSTOMER_SUCCESS), (typeof AT.GET_CAR_BY_CUSTOMER_ERROR)>(action);

export const CarsWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_CARS_WITH_PAGING_REQUEST), (typeof AT.LIST_CARS_WITH_PAGING_SUCCESS), (typeof AT.LIST_CARS_WITH_PAGING_ERROR)>(action);
