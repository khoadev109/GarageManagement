import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";
import { IRight } from "./right-model";

export interface IModule {
    Id: numberOrEmpty;
    Name: stringOrEmpty;
    Description: stringOrEmpty;
    RightValue: numberOrEmpty;
    RightModules: Array<IRight>;
}

export class Module {
    constructor(public Id: numberOrEmpty, 
                public Name: stringOrEmpty,
                public Description: stringOrEmpty
            ){}
}