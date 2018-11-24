import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    savePermissionResult: any;
    getPermissionByUserResult: any;
    getPermissionByRoleResult: any;
    getUserResult: any;
    getRoleResult: any;
    getModuleResult: any;
}

export interface IFormDispatchProps {
    
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class RoleRightModuleMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            savePermissionResult: state.SavePermissionReducer,
            getPermissionByUserResult: state.GetPermissionByUserReducer,
            getPermissionByRoleResult: state.GetPermissionByRoleReducer,
            getUserResult: state.GetUserReducer,
            getRoleResult: state.GetRoleReducer,
            getModuleResult: state.GetModuleReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        let getPermissionByUserAction = new FetchAction.GetByUserAction();
        let getPermissionByRoleAction = new FetchAction.GetByRoleAction();
        let getRoleAction = new FetchAction.GetRoleAction();
        let getUserAction = new FetchAction.GetUserAction();
        let getModuleAction = new FetchAction.GetModuleAction();
        let savePermissionAction = new PostAction.SavePermissionAction();

        return {
            getPermissionByUser: (entry: any) => dispatch(getPermissionByUserAction.fetch(entry)),
            getPermissionByRole: (entry: any) => dispatch(getPermissionByRoleAction.fetch(entry)),
            getUsers: (entry: any) => dispatch(getUserAction.fetch(entry)),
            getRoles: (entry: any) => dispatch(getRoleAction.fetch(entry)),
            getModules: (entry: any) => dispatch(getModuleAction.fetch(entry)),
            savePermission: (entry: any) => dispatch(savePermissionAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
