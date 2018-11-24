import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IPublicService {
    Id: stringOrEmpty,
    GenerateId: number
    Name: stringOrEmpty,
    Cost: numberOrEmpty,
    Description: stringOrEmpty,
    ServiceTypeId: numberOrEmpty,
    ServiceTypeName: stringOrEmpty,
    UnitId: numberOrEmpty,
    UnitName: stringOrEmpty,
    BranchId: numberOrEmpty,
    BranchName: stringOrEmpty,
    IsInputServiceId?: booleanOrEmpty
}
