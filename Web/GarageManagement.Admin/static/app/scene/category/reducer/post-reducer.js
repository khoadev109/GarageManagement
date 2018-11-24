import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CategoryCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CATEGORY_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CATEGORY_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CATEGORY_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CategoryEditReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CATEGORY_EDIT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CATEGORY_EDIT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CATEGORY_EDIT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CategoryDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CATEGORY_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CATEGORY_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CATEGORY_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map