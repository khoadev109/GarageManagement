import * as redux from "redux";
import { ActionType } from "../aside/action-type";

export interface IActivator {
    parentName: string,
    active: boolean
}

export const Activator : IActivator = {
    parentName: "",
    active: false
}

export class AsideAction {
    setActiveLinkAction(activator: IActivator) {
        return (dispatch: any) => {
            //always set true
            activator.active = true;
            dispatch(this.dispatchActiveSetting(activator));
        };
    }
    
    dispatchActiveSetting(activator: IActivator) {
        return { 
            type: ActionType.SET_ACTIVE_LINK, 
            result: activator 
        }
    }
}
