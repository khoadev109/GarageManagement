import { stringOrEmpty, numberOrEmpty } from "core/library/data-type";

export interface ICategory {
    Id: numberOrEmpty;    
    Name: stringOrEmpty;
    ParentId: numberOrEmpty;
    ParentName: stringOrEmpty;
}
