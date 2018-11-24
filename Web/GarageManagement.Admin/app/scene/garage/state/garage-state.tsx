import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IGarage {
    Id: numberOrEmpty;
    Website: stringOrEmpty;
    ExpireDate: stringOrEmpty;
    Name: stringOrEmpty;
    ShortName: stringOrEmpty;
    Address: stringOrEmpty;
    District: stringOrEmpty;
    Ward: stringOrEmpty;
    Phone: stringOrEmpty;
    Logo: stringOrEmpty;
    SmsPhoneNumber: booleanOrEmpty;
    EmailSchedule: booleanOrEmpty;
}
