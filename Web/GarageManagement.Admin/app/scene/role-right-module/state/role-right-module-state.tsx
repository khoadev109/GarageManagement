import { IUser } from "../model/user-model";
import { IRole } from "../model/role-model";
import { IModule } from "../model/module-model";
import { IRoleRightModule } from "../model/role-right-module-model";

export interface IRoleRightModuleState {
    Users: Array<IUser>,
    Roles: Array<IRole>,
    Modules: Array<IModule>,
    Permission: IRoleRightModule,
    DataResponse: {
        RoleRightModules: Array<IRoleRightModule>
    }
}