import { IServiceUnit } from "../state/service-unit-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailServiceUnitResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            ServiceUnit: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name)
            }
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
