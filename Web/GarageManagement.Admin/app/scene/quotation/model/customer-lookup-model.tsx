import { ICar } from "../../car/model/car-model";
import { ICustomer } from "../../customer/model/customer-model";

export interface ICustomerLookup {
    Id: string,
    CustomerId: string,
    CustomerName: string,
    CustomerPhone: string,
    CarId: string,
    LicensePlates: string,
    CombineName: string,
}
