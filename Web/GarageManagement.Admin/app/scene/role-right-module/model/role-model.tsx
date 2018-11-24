import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IRole {
    Id: numberOrEmpty;
    Name: stringOrEmpty;
}

export class Role {
    constructor(public Id: numberOrEmpty, 
                public Name: stringOrEmpty
            ){}
}