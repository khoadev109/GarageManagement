import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CarReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_CAR_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_SPECIFY_CAR_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_SPECIFY_CAR_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CarsWithPagingReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LIST_CARS_WITH_PAGING_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LIST_CARS_WITH_PAGING_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LIST_CARS_WITH_PAGING_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
// Temporary
export const AllManufacturersReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_MANUFACTURERS_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_ALL_MANUFACTURERS_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_ALL_MANUFACTURERS_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const ModelsByManufacturerReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_MODELS_BY_MANUFACTURER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_MODELS_BY_MANUFACTURER_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_MODELS_BY_MANUFACTURER_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const YearsByModelReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_YEARS_BY_MODEL_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_YEARS_BY_MODEL_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_YEARS_BY_MODEL_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map