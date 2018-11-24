import { ActionType } from "../aside/action-type";
import { Activator } from "../aside/action";

export const AsideReducer = (state = Activator, action: any) => {
    switch (action.type) {
        case ActionType.SET_ACTIVE_LINK:
        return {
            ...state,
            target: action.result
        }
        default:
            return state;
    }
}
