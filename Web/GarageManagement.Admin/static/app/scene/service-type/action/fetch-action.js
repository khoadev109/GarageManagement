import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class ServiceTypeAction {
    getServiceType(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.ServiceTypeService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_SERVICE_TYPE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_SERVICE_TYPE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_SERVICE_TYPE_ERROR, error };
    }
}
export class ServiceTypePagingAction {
    listServiceTypeWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.ServiceTypeFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_SERVICE_TYPES_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_SERVICE_TYPES_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_SERVICE_TYPES_WITH_PAGING_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map