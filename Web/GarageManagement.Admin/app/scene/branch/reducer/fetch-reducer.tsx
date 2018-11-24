import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const BranchReducer  = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_BRANCH_REQUEST), (typeof AT.GET_UNIQUE_BRANCH_SUCCESS), (typeof AT.GET_UNIQUE_BRANCH_ERROR)>(action);

export const BranchesWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_BRANCHES_REQUEST), (typeof AT.GET_BRANCHES_SUCCESS), (typeof AT.GET_BRANCHES_ERROR)>(action);
