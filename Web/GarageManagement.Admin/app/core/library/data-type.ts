export type empty = undefined | null;
export type stringOrEmpty = string | empty;
export type numberOrEmpty = number | empty;
export type booleanOrEmpty = boolean | empty;
export type stringOrNumberType = string | number;

export function returnBooleanOrDefaultValue(value: any): boolean {
    return value && typeof value === "boolean" ? value : false;
}

export function returnNumberOrDefaultValue(value: any): number {
    return value && typeof value === "number" ? value : 0;
}

export function returnStringOrDefaultValue(value: any): string {
    return value && typeof value === "string" ? value : "";
}

export function formatNumberWithCommaSeparator(value: number) : string {
    return value.toLocaleString('en', {maximumSignificantDigits : 21});
}
