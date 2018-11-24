import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class AccessaryAction {
    getAccessary(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.AccessaryService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_ACCESSARIES_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_ACCESSARIES_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_ACCESSARIES_ERROR, error };
    }
}
export class AllAccessariesAction {
    getAccessaries(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.AllAccessariesService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_ALL_ACCESSARIES_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_ALL_ACCESSARIES_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_ALL_ACCESSARIES_ERROR, error };
    }
}
export class AccessariesPagingAction {
    listServicesWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.AccessariesFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_ACCESSARIES_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_ACCESSARIES_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_ACCESSARIES_WITH_PAGING_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map