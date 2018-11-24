import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const CarModelReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_CAR_MODEL_REQUEST), (typeof AT.GET_UNIQUE_CAR_MODEL_SUCCESS), (typeof AT.GET_UNIQUE_CAR_MODEL_ERROR)>(action);

export const AllCarModelsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_CAR_MODELS_REQUEST), (typeof AT.GET_ALL_CAR_MODELS_SUCCESS), (typeof AT.GET_ALL_CAR_MODELS_ERROR)>(action);

export const CarModelsWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_CAR_MODELS_WITH_PAGING_REQUEST), (typeof AT.LIST_CAR_MODELS_WITH_PAGING_SUCCESS), (typeof AT.LIST_CAR_MODELS_WITH_PAGING_ERROR)>(action);
