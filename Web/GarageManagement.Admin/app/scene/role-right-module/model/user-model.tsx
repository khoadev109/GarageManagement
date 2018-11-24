import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IUser {
    UserId: numberOrEmpty;
    FullName: stringOrEmpty;
    UserName: stringOrEmpty;
    Email: stringOrEmpty;
    RoleId: numberOrEmpty;
    RoleName: stringOrEmpty;
}

export class User {
    constructor(public UserId: numberOrEmpty,
        public FullName: stringOrEmpty,
        public UserName: stringOrEmpty,
        public Email: stringOrEmpty,
        public RoleId: numberOrEmpty,
        public RoleName: stringOrEmpty
    ) { }
}