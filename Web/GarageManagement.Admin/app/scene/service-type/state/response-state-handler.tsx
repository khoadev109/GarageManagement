import { IServiceType } from "./service-type-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailServiceTypeResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            ServiceType: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ParentId: returnNumberOrDefaultValue(dataResponse.ParentId),
                ParentName: returnStringOrDefaultValue(dataResponse.ParentName)
            }
        }, 
        () => { callBack(); });
    }

    export function setParentServiceTypesResponse(dataResponse: any) {
        let parentServiceTypes = new Array<IServiceType>();
        if (dataResponse) {
            dataResponse.map((parent, i) => {
                parentServiceTypes.push(parent.Id, parent.Name);
            })
        }
        this.setState({ Parent: parentServiceTypes });        
    }
}

export default StateResponse;
