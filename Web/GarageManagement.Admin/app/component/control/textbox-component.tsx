import React from "react";

interface TextboxParameter {
    name: string;
    value: any;
    disabled?: boolean;
    labelText?: string;
    isRequired?: boolean;
    event?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const Textbox = (props: TextboxParameter) => {
    return (
        <input type="text" className="form-control" 
               name={props.name} value={props.value}
               disabled={props.disabled} onInput={props.event} />
    )
}

export const TextboxFormGroupWrapper = (props: TextboxParameter) => {
    return (
        <div className="form-group">
            <Textbox name={props.name} value={props.value}
                     disabled={props.disabled} event={props.event} />
        </div>
    )
}

export const TextboxReadOnly = (props: TextboxParameter) => {
    return (
        <input type="text" className="form-control" 
               readOnly name={props.name} value={props.value} />
    )
}

export const TextboxWithLabelHorizontal = (props: TextboxParameter) => {
    const labelClass = "col-sm-3 control-label" + (props.isRequired ? " required" : "");

    return (
        <div className="form-group">
            <label className={labelClass}>{props.labelText}</label>
            <div className="col-sm-9">
                <Textbox name={props.name} value={props.value} 
                         disabled={props.disabled} event={props.event} />
            </div>
        </div>
    )
}

export const TextboxReadOnlyWithLabelHorizontal = (props: TextboxParameter) => {
    const labelClass = "col-sm-3 control-label" + (props.isRequired ? " required" : "");

    return (
        <div className="form-group">
            <label className={labelClass}>{props.labelText}</label>
            <div className="col-sm-9">
                <TextboxReadOnly name={props.name} value={props.value} />
            </div>
        </div>
    )
}
