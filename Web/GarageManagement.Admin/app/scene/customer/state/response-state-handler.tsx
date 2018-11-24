import GeneralState from "../../../core/state/general-state";
import { 
    returnStringOrDefaultValue, 
    returnNumberOrDefaultValue, 
    returnBooleanOrDefaultValue 
} from "../../../core/library/data-type";

module StateResponse {
    export function setDetailCustomerResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.GenerateId) > 0,
            Customer: {
                Id: returnStringOrDefaultValue(dataResponse.Id),
                GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
                CustomerExchangeId: returnNumberOrDefaultValue(dataResponse.CustomerExchangeId),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Phone: returnStringOrDefaultValue(dataResponse.Phone),
                Fax: returnStringOrDefaultValue(dataResponse.Fax),
                Email: returnStringOrDefaultValue(dataResponse.Email),
                Website: returnStringOrDefaultValue(dataResponse.Website),
                Address: returnStringOrDefaultValue(dataResponse.Address),
                Province: returnStringOrDefaultValue(dataResponse.Province),
                District: returnStringOrDefaultValue(dataResponse.District),
                Ward: returnStringOrDefaultValue(dataResponse.Ward),
                TaxCode: returnStringOrDefaultValue(dataResponse.TaxCode),
                BankAccount: returnStringOrDefaultValue(dataResponse.BankAccount),
                BankName: returnStringOrDefaultValue(dataResponse.BankName),
                IsSupplier: returnBooleanOrDefaultValue(dataResponse.IsSupplier),
                IsOwner: returnBooleanOrDefaultValue(dataResponse.IsOwner),
                BranchId: returnStringOrDefaultValue(dataResponse.BranchId),
                BranchName: returnStringOrDefaultValue(dataResponse.BranchName),
                CustomerTypeId: returnNumberOrDefaultValue(dataResponse.CustomerTypeId),
                CustomerTypeName: returnStringOrDefaultValue(dataResponse.CustomerTypeName),
                ContactName: returnStringOrDefaultValue(dataResponse.ContactName),
                ContactPhone: returnStringOrDefaultValue(dataResponse.ContactPhone),
                ContactPosition: returnStringOrDefaultValue(!dataResponse.ContactPosition)
            },
            Branches: setBranchResponse(dataResponse.Branches),
            CustomerTypes: setCustomerTypeResponse(dataResponse.CustomerTypes)
        }, 
        () => { callBack(); });
    }

    export function setBranchResponse(response) {
        const branches = new Array<GeneralState.Branch>();
        if (response) {
            response.forEach(branch => {
                branches.push(new GeneralState.Branch(branch.Id, branch.Name, branch.ShortName));
            });
        }
        return branches;
    }

    export function setCustomerTypeResponse(response) {
        const customerTypes = new Array<GeneralState.CustomerType>();
        if (response) {
            response.forEach(customerType => {
                customerTypes.push(new GeneralState.CustomerType(customerType.Id, customerType.Name));
            });
        }
        return customerTypes;
    }
}

export default StateResponse;
