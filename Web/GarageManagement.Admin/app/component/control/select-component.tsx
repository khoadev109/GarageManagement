import React from "react";

interface SelectParameter {
    name: string;
    value: any;
    disabled?: boolean;
    labelText?: string;
    isRequired?: boolean;
    loadDataFunc(): void;
    event(event: React.FormEvent<HTMLSelectElement>): void;
}

export const Select = (props: SelectParameter) => {
    return (
        <select className="form-control m-b"
                name={props.name} value={props.value}
                disabled={props.disabled} onChange={props.event}>
            {props.loadDataFunc}
        </select>
    )
}

export const SelectWithLabelHorizontal = (props: SelectParameter) => {
    const labelClass = "col-sm-3 control-label" + (props.isRequired ? " required" : "");

    return (
        <div className="form-group">
            <label className={labelClass}>{props.labelText}</label>
            <div className="col-sm-9">
                <Select name={props.name} value={props.value} 
                        disabled={props.disabled} event={props.event}
                        loadDataFunc={props.loadDataFunc} />
            </div>
        </div>
    )
}
