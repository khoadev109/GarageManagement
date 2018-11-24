import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailManufacturerResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            Manufacturer: {
                Id: dataResponse.Id,
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Description: returnStringOrDefaultValue(dataResponse.Description)
            },
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
