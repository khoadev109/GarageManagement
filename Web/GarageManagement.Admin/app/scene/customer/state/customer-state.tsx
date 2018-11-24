export interface ICustomer {
    Id: string;
    GenerateId: number;
    CustomerExchangeId: number;
    Name: string;
    Phone: string;
    Fax: string;
    Email: string;
    Website: string;
    Address: string;
    Province: string;
    District: string;
    Ward: string;
    TaxCode: string;
    BankAccount: string;
    BankName: string;
    IsSupplier: boolean;
    IsOwner?: boolean;
    BranchId: string;
    BranchName: string;
    CustomerTypeId: number;
    CustomerTypeName: string;
    ContactName: string;
    ContactPhone: string;
    ContactPosition: string;
}
