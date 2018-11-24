import { stringOrEmpty, numberOrEmpty } from "core/library/data-type";

export interface IBranch {
    Id: stringOrEmpty,
    GenerateId?: numberOrEmpty,
    Name: stringOrEmpty,
    ShortName?: stringOrEmpty,
    Phone?: stringOrEmpty,
    Email?: stringOrEmpty,
    Address?: stringOrEmpty,
    Province?: stringOrEmpty,
    District?: stringOrEmpty,
    Ward?: stringOrEmpty
}
