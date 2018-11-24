import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class CarModelAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_UNIQUE_CAR_MODEL_REQUEST;
    successAction = AT.GET_UNIQUE_CAR_MODEL_SUCCESS;    
    errorAction = AT.GET_UNIQUE_CAR_MODEL_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CarModelService());
    }
}

export class AllCarModelsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_CAR_MODELS_REQUEST;
    successAction = AT.GET_ALL_CAR_MODELS_SUCCESS;    
    errorAction = AT.GET_ALL_CAR_MODELS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllCarModelsService());
    }
}

export class CarModelsPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_CAR_MODELS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_CAR_MODELS_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_CAR_MODELS_WITH_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CarModelsFilterAndPagingService());
    }
}
