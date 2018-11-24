import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const BranchCreateReducer = 
(action: any) => CoreReducer.Create<(typeof AT.BRANCH_CREATE_REQUEST), (typeof AT.BRANCH_CREATE_SUCCESS), (typeof AT.BRANCH_CREATE_ERROR)>(action);

export const BranchEditReducer = 
(action: any) => CoreReducer.Create<(typeof AT.BRANCH_EDIT_REQUEST), (typeof AT.BRANCH_EDIT_SUCCESS), (typeof AT.BRANCH_EDIT_ERROR)>(action);

export const BranchDeleteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.BRANCH_DELETE_REQUEST), (typeof AT.BRANCH_DELETE_SUCCESS), (typeof AT.BRANCH_DELETE_ERROR)>(action);
