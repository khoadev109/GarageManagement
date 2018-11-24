import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class PublicServAction {
    getService(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.PublicServService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_SERVICE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_SERVICE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_SERVICE_ERROR, error };
    }
}
export class AllPublicServAction {
    getServices(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.AllPublicServsService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_SERVICE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_SERVICE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_SERVICE_ERROR, error };
    }
}
export class PublicServsPagingAction {
    listServicesWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.PublicServsFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_SERVICES_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_SERVICES_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_SERVICES_WITH_PAGING_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map