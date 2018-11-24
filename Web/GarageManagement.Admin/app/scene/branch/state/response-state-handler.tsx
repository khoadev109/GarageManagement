import { returnStringOrDefaultValue, returnNumberOrDefaultValue, returnBooleanOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailBranchResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            LoadSucceed: true,
            Branch: {
                Id: returnStringOrDefaultValue(dataResponse.Id),
                GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ShortName: returnStringOrDefaultValue(dataResponse.ShortName),
                Phone: returnStringOrDefaultValue(dataResponse.Phone),
                Email: returnStringOrDefaultValue(dataResponse.Email),
                Address: returnStringOrDefaultValue(dataResponse.Address),
                Province: returnStringOrDefaultValue(dataResponse.Province),
                District: returnStringOrDefaultValue(dataResponse.District),
                Ward: returnStringOrDefaultValue(dataResponse.Ward)
            },
            Errors: this.errors
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
