import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IRoleRightModule {
    Id: numberOrEmpty;
    Value: numberOrEmpty;
    RoleId: numberOrEmpty;
    UserId: numberOrEmpty;
    ModuleId: numberOrEmpty;
    UserRights: Array<IUserRight>
}

export interface IUserRight {
    Id: number;
    ModuleId: number;
    Value: number;
}

export class RoleRightModule {
    constructor(public Id: numberOrEmpty, 
                public Value: numberOrEmpty,
                public RoleId: numberOrEmpty,
                public UserId: numberOrEmpty,
                public ModuleId: numberOrEmpty,
            ){}
}