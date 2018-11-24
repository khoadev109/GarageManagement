import { stringOrEmpty, numberOrEmpty } from "core/library/data-type";

export interface IAccessary {
    Id: stringOrEmpty,
    GenerateId: numberOrEmpty,
    Name: stringOrEmpty,
    Image: stringOrEmpty,
    BarCode: stringOrEmpty,
    Price: numberOrEmpty,
    CostGoodSold: numberOrEmpty,
    OutOfStock: boolean,
    Description: stringOrEmpty,
    CategoryId: numberOrEmpty,
    CategoryName: stringOrEmpty,
    UnitId: numberOrEmpty,
    UnitName: stringOrEmpty,
    BranchId: stringOrEmpty,
    BranchName: stringOrEmpty,
    IsInputAccessaryId?: boolean
}
