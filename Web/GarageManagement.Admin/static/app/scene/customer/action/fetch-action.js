import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class CustomerAction {
    getCustomer(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CustomerService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_CUSTOMER_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_CUSTOMER_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_CUSTOMER_ERROR, error };
    }
}
export class CustomersPagingAction {
    listCustomersWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CustomersFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_CUSTOMERS_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_CUSTOMERS_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_CUSTOMERS_WITH_PAGING_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map