import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailAccessaryResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            AccessaryUnit: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name)
            },
            Errors: this.errors
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
