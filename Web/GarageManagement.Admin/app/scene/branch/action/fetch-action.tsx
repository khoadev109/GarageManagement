import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class BranchAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_BRANCH_REQUEST;
    successAction = AT.GET_UNIQUE_BRANCH_SUCCESS;    
    errorAction = AT.GET_UNIQUE_BRANCH_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.BranchService());
    }
}

export class BranchesPagingAction extends BaseAction implements IFetchAction {
    requestAction = AT.LIST_BRANCHES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_BRANCHES_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_BRANCHES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.BranchesFilterAndPagingService());
    }
}
