import { stringOrEmpty, numberOrEmpty } from "../../../core/library/data-type";

export interface ICustomerType {
    Id : numberOrEmpty,
    Name : stringOrEmpty,
    Description? : stringOrEmpty
}
