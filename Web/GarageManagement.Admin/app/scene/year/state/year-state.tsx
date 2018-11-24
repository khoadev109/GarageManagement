import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IYear {
    Id: number,    
    Name: stringOrEmpty,    
    ModelId: numberOrEmpty,
    ModelName: stringOrEmpty
}
