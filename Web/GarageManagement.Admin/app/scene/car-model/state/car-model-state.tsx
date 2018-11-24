import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface ICarModel {
    Id: numberOrEmpty,
    Name: stringOrEmpty,
    Description: stringOrEmpty,
    StyleId: numberOrEmpty,
    StyleName: stringOrEmpty,
    ManufacturerId: numberOrEmpty,
    ManufacturerName: stringOrEmpty
}
