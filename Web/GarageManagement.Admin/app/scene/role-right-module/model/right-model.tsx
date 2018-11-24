import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IRight {
    Id: numberOrEmpty;
    Name: stringOrEmpty;
    Value: booleanOrEmpty;
}

export class Right {
    constructor(public Id: numberOrEmpty, 
                public Name: stringOrEmpty,
                public Value: booleanOrEmpty
            ){}
}