import React from "react";
import * as _ from "lodash";
import { ToastContainer } from "react-toastify";
import { numberOrEmpty } from "core/library/data-type";
import { empty } from "glamor";
import { NoData } from "component/common/paging/nodata-component";

import { IRole } from "../../model/role-model";
import { IModule } from "../../model/module-model";
import { IUser } from "../../model/user-model";
import { IRight } from "../../model/right-model";
import { IRoleRightModule, IUserRight } from "../../model/role-right-module-model";
import { RoleRightModuleMapping, IFormProps } from "scene/role-right-module/redux-mapping/role-right-module-mapping";
import AppCommon from "core/component/base-component";
import { IRoleRightModuleState } from "../../state/role-right-module-state";
import StateResponse from "scene/role-right-module/state/response-handler-state";

class RoleRightModule extends AppCommon.BaseComponent<any, IRoleRightModuleState> {
    
    private userId: numberOrEmpty;
    private roleId: numberOrEmpty;

    public initState(): void {
        this.state = {
            Users: new Array<IUser>(),
            Roles: new Array<IRole>(),
            Modules: new Array<IModule>(),
            Permission: {
                Id: 0,
                Value: 0,
                UserId: null,
                RoleId: null,
                ModuleId: 0,
                UserRights: new Array<IUserRight>()
            },
            DataResponse: {
                RoleRightModules: new Array<IRoleRightModule>()
            }
        }
    }

    getValuePermission(type: number): number {
        switch (type) {
            case 1: return 16;
            case 2: return 8;
            case 3: return 4;
            case 4: return 2;
            case 5: return 1;
        }
    }
    
    getCheckedValueModule(moduleId: number): number {
        let itemModule = this.state.Modules.find(function (d) { return d.Id === moduleId });
		let valuePermiss = 0;
		if (!!itemModule) {
			let countList = itemModule.RightModules.length;
			for (let i = 0; i < countList; i++) {
				let obj = itemModule.RightModules[i];
				let checked = obj.Value;
				if (checked) {
					valuePermiss += this.getValuePermission(obj.Id);
				}
			}
		}
		return valuePermiss;
    }

    onSetItemRoleRightModule(event: any, moduleId: number, rightId: number) {
        let name = event.target.name;
        let value = event.target.checked;
        
        StateResponse.updateCheckedRightModule(moduleId, rightId, value);
        
        let valuePer = this.getCheckedValueModule(moduleId);
        
        this.state.Permission.Value = valuePer;
        this.state.Permission.UserId = this.userId;
        this.state.Permission.RoleId = this.roleId;
        this.state.Permission.ModuleId = moduleId;
        
        this.onSavePermission(this.state.Permission);
    }

    onSelectRole(role: IRole) {
        this.roleId = role.Id;
        this.userId = null;
        this.props.getPermissionByRole(this.roleId);
    }

    onSelectUser(user: IUser) {
        this.roleId = null;
        this.userId = user.UserId;
        this.props.getPermissionByUser(this.userId);
    }

    onSavePermission(permission: IRoleRightModule) {
        this.props.savePermission(permission);
    }

    componentDidMount() {
        this.props.getRoles();
        this.props.getUsers();
        this.props.getModules();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.savePermissionResponseState(nextProps);
        this.setResponseStatePermissionByRole(nextProps);
        this.setResponseStatePermissionByUser(nextProps);
        this.setResponseStateUsers(nextProps);
        this.setResponseStateRoles(nextProps);
        this.setResponseStateModules(nextProps);
    }

    savePermissionResponseState(nextProps: IFormProps) {
        let savePermissionResult = nextProps.savePermissionResult.target;
        let isChanged = this.isPropsChanged(this.props.savePermissionResult.target, savePermissionResult);

        if (isChanged) {
            StateResponse.savePermissionResponseState(savePermissionResult);
        }
    }

    setResponseStatePermissionByUser(nextProps: IFormProps) {
        let getPermissionByUserResult = nextProps.getPermissionByUserResult.target;
        let isChanged = this.isPropsChanged(this.props.getPermissionByUserResult.target, getPermissionByUserResult);

        if (isChanged && getPermissionByUserResult.Success)
            StateResponse.setResponseStatePermissionByUser(getPermissionByUserResult.Data);
    }

    setResponseStatePermissionByRole(nextProps: IFormProps) {   
        let getPermissionByRoleResult = nextProps.getPermissionByRoleResult.target;
        let isChanged = this.isPropsChanged(this.props.getPermissionByRoleResult.target, getPermissionByRoleResult);

        if (isChanged && getPermissionByRoleResult.Success)
            StateResponse.setResponseStatePermissionByRole(getPermissionByRoleResult.Data);
    }
            
    setResponseStateUsers(nextProps: IFormProps) {
        let getUserResult = nextProps.getUserResult.target;
        let isChanged = this.isPropsChanged(this.props.getUserResult.target, getUserResult);

        if (isChanged && getUserResult.Success)
            StateResponse.setResponseStateUsers(getUserResult.Data);
    }

    setResponseStateRoles(nextProps: IFormProps) {
        let getRoleResult = nextProps.getRoleResult.target;
        let isChanged = this.isPropsChanged(this.props.getRoleResult.target, getRoleResult);

        if (isChanged && getRoleResult.Success)
            StateResponse.setResponseStateRoles(getRoleResult.Data);
    }

    setResponseStateModules(nextProps: IFormProps) {
        let getModuleResult = nextProps.getModuleResult.target;
        let isChanged = this.isPropsChanged(this.props.getModuleResult.target, getModuleResult);

        if (isChanged && getModuleResult.Success)
            StateResponse.setResponseStateModules(getModuleResult.Data);
    }

    fetchRoles() {
        let rolesResult = this.props.getRoleResult.target;
        if (rolesResult.Success) {
            let dtosResponse = rolesResult.Data;

            return (
                dtosResponse.length ?
                    dtosResponse.map((role, i) => { return this.fetchRole(role, i) }) : <NoData />
            )
        }
    }

    fetchRole(item: IRole, idx: number) {
        return (
            <tr className={this.roleId == item.Id ? "active" : ""} onClick={() => { this.onSelectRole(item) }}>
                <td>{idx}</td>
                <td>{item.Name}</td>
            </tr>
        );
    }

    fetchUsers() {
        let usersResult = this.props.getUserResult.target;
        if (usersResult.Success) {
            let dtosResponse = usersResult.Data;

            return (
                dtosResponse.length ?
                    dtosResponse.map((user, i) => { return this.fetchUser(user, i) }) : <NoData />
            )
        }
    }

    fetchUser(item: IUser, idx: number) {
        return (
            <tr className={this.userId == item.UserId ? "active" : ""} onClick={() => { this.onSelectUser(item) }}>
                <td>{idx}</td>
                <td>{item.FullName}</td>
            </tr>
        );
    }

    fetchModules() {
        let modulesResult = this.props.getModuleResult.target;
        if (modulesResult.Success) {
            let dtosResponse = modulesResult.Data;

            return (
                dtosResponse.length ?
                    dtosResponse.map((module, i) => { return this.fetchModule(module, i) }) : <NoData />
            )
        }
    }

    fetchModule(item: IModule, idx: number) {
        return (
            <tr>
                <td>{idx}</td>
                <td>{item.Name}</td>
                <td>
                    {this.fetchRights(item.RightModules, item.Id)}
                </td>
            </tr>
        );
    }

    fetchRights(rightDtos: Array<IRight>, moduleId: number) {
        return (
            rightDtos.length ?
                rightDtos.map((right, i) => { return this.fetchRight(right, moduleId) }) : <NoData />
        )
    }

    fetchRight(item: IRight, moduleId: number) {
        return (
            <div className="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id={`chk-${moduleId}-${item.Id}`} name={`chk-${moduleId}`} checked={item.Value} onChange={e => { this.onSetItemRoleRightModule(e, moduleId, item.Id) }} />
                <label htmlFor={`chk-${moduleId}-${item.Id}`}>{item.Name}</label>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Advanced Access Manager</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="tabs-container">
                                                <ul className="nav nav-tabs">
                                                    <li className="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">Nhóm</a></li>
                                                    <li><a data-toggle="tab" href="#tab-2" aria-expanded="false">Nhân viên</a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div id="tab-1" className="tab-pane active">
                                                        <table className="table table-bordered table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Tên</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.fetchRoles()}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div id="tab-2" className="tab-pane">
                                                        <table className="table table-bordered table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Tên</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.fetchUsers()}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="tabs-container">
                                                <ul className="nav nav-tabs">
                                                    <li className="active"><a data-toggle="tab" href="#tab-3" aria-expanded="true">List modules</a></li>
                                                </ul>
                                            </div>
                                            <div className="tab-content">
                                                <div id="tab-3" className="tab-pane active">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "10%" }}>#</th>
                                                                <th style={{ width: "40%" }}>Chức năng</th>
                                                                <th style={{ width: "50%" }}>Hành động</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.fetchModules()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
            </React.Fragment>
        )
    }
}

const connectedRoleRightModule = new RoleRightModuleMapping().connectComponent(RoleRightModule);
export { connectedRoleRightModule as RoleRightModule };
