import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailCustomerTypeResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: dataResponse.Id > 0,
            CustomerType: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Description: returnStringOrDefaultValue(dataResponse.Description)
            },
            Errors: this.errors
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
