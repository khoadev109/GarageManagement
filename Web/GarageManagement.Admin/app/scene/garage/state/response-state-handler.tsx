import { returnStringOrDefaultValue, returnNumberOrDefaultValue, returnBooleanOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailGarageResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            Garage: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Website: returnStringOrDefaultValue(dataResponse.Website),
                ExpireDate: returnStringOrDefaultValue(dataResponse.ExpireDate),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ShortName: returnStringOrDefaultValue(dataResponse.ShortName),
                Address: returnStringOrDefaultValue(dataResponse.Address),
                District: returnStringOrDefaultValue(dataResponse.District),
                Ward: returnStringOrDefaultValue(dataResponse.Ward),
                Phone: returnStringOrDefaultValue(dataResponse.Phone),
                Logo: returnStringOrDefaultValue(dataResponse.Logo),
                SmsPhoneNumber: returnBooleanOrDefaultValue(dataResponse.SmsPhoneNumber),
                EmailSchedule: returnBooleanOrDefaultValue(dataResponse.EmailSchedule)
            }
        }, 
        () => { callBack(); });
    }
}

export default StateResponse;
