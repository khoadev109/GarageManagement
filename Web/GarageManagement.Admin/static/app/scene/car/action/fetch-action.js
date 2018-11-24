import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class CarAction {
    getCar(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CarService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_CAR_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_CAR_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_CAR_ERROR, error };
    }
}
export class CarsPagingAction {
    listCarsWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CarsFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_CARS_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_CARS_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_CARS_WITH_PAGING_ERROR, error };
    }
}
// Temporary
export class AllManufacturersAction {
    getAllManufacturers() {
        return (dispatch) => {
            dispatch(this.request());
            let service = new FetchService.AllManufacturersService();
            service.execute().then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request() {
        return { type: ActionType.GET_ALL_MANUFACTURERS_REQUEST };
    }
    success(result) {
        return { type: ActionType.GET_ALL_MANUFACTURERS_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_ALL_MANUFACTURERS_ERROR, error };
    }
}
export class ModelsByManufacturerAction {
    getModelsByManufacturer(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.ModelsByManufacturerService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_MODELS_BY_MANUFACTURER_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_MODELS_BY_MANUFACTURER_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_MODELS_BY_MANUFACTURER_ERROR, error };
    }
}
export class YearsByModelAction {
    getYearsByModel(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.YearsByModelService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_YEARS_BY_MODEL_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_YEARS_BY_MODEL_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_YEARS_BY_MODEL_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map