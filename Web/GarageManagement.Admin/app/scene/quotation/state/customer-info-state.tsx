import { stringOrEmpty, numberOrEmpty } from "../../../core/library/data-type";

export interface ICustomer {
    Id: stringOrEmpty;
    GenerateId: numberOrEmpty;
    Name: stringOrEmpty;
    Phone: stringOrEmpty;
    Email: stringOrEmpty;
    Address: stringOrEmpty;
    BranchId: stringOrEmpty;
    BranchName: stringOrEmpty;
    CustomerTypeId: numberOrEmpty;
    CustomerTypeName: stringOrEmpty;
}

export interface ICustomerInfo extends ICustomerInfoCallBack {
    Customer: ICustomer
}

export interface ICustomerInfoCallBack {
    OnSearch?: (searchTerm: string) => void;
}
