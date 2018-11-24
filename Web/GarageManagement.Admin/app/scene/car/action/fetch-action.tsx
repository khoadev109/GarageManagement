import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class CarAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_CAR_REQUEST;
    successAction = AT.GET_UNIQUE_CAR_SUCCESS;
    errorAction = AT.GET_UNIQUE_CAR_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CarService());
    }
}

export class OwnedCarsAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_OWNED_CARS_REQUEST;
    successAction = AT.GET_OWNED_CARS_SUCCESS;
    errorAction = AT.GET_OWNED_CARS_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.OwnedCarsService());
    }
}

export class CarByCustomerAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_CAR_BY_CUSTOMER_REQUEST;
    successAction = AT.GET_CAR_BY_CUSTOMER_SUCCESS;
    errorAction = AT.GET_CAR_BY_CUSTOMER_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CarByCustomerService());
    }
}

export class CarsPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_CARS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_CARS_WITH_PAGING_SUCCESS;
    errorAction = AT.LIST_CARS_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CarsFilterAndPagingService());
    }
}

// Temporary

export class AllManufacturersAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_MANUFACTURERS_REQUEST;
    successAction = AT.GET_ALL_MANUFACTURERS_SUCCESS;
    errorAction = AT.GET_ALL_MANUFACTURERS_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllManufacturersService());
    }
}

export class ModelsByManufacturerAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_MODELS_BY_MANUFACTURER_REQUEST;
    successAction = AT.GET_MODELS_BY_MANUFACTURER_SUCCESS;
    errorAction = AT.GET_MODELS_BY_MANUFACTURER_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ModelsByManufacturerService());
    }
}

export class YearsByModelAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_YEARS_BY_MODEL_REQUEST;
    successAction = AT.GET_YEARS_BY_MODEL_SUCCESS;
    errorAction = AT.GET_YEARS_BY_MODEL_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.YearsByModelService());
    }
}
