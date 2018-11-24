import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IServiceType {
    Id: numberOrEmpty;
    Name: stringOrEmpty;
    ParentId: numberOrEmpty;
    ParentName: stringOrEmpty;
}
