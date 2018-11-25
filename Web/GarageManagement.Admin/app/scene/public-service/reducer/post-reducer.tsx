// import * as React from "react";
// import { ActionType } from "../action/action-type";
// import * as CoreReducer from "core/redux/root-reducer";

// export const PublicServCreateReducer = (state = CoreReducer.ResponseState, action: any) => {
//     switch (action.type) {
//         case ActionType.SERVICE_CREATE_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case ActionType.SERVICE_CREATE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 target: action.result
//             }
//         case ActionType.SERVICE_CREATE_ERROR:
//             return {
//                 ...state,
//                 loading: false, 
//                 error: action.error
//             }
//         default:
//             return state
//     }
// }

// export const PublicServEditReducer = (state = CoreReducer.ResponseState, action: any) => {
//     switch (action.type) {
//         case ActionType.SERVICE_EDIT_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case ActionType.SERVICE_EDIT_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 target: action.result
//             }
//         case ActionType.SERVICE_EDIT_ERROR:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             }
//         default:
//             return state
//     }
// }

// export const PublicServDeleteReducer = (state = CoreReducer.ResponseState, action: any) => {
//     switch (action.type) {
//         case ActionType.SERVICE_DELETE_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case ActionType.SERVICE_DELETE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 target: action.result
//             }
//         case ActionType.SERVICE_DELETE_ERROR:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             }
//         default:
//             return state
//     }
// }
