import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IManufacturer {
    Id: numberOrEmpty,
    Name: stringOrEmpty,
    Description: stringOrEmpty
}
