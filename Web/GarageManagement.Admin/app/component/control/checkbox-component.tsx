import React from "react";

interface CheckboxParameter {
    name: string;
    checked: boolean;
    labelText?: string;
    isRequired?: boolean;
    style?: {};
    event: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: CheckboxParameter) => {
    return (
        <input type="checkbox" name={props.name}
               checked={props.checked} onChange={props.event} />
    )
}

export const CheckboxWithLabelHorizontal = (props: CheckboxParameter) => {
    return (
        <div className="form-group">
            <label className="col-sm-9 col-sm-offset-3 checkbox checkbox-inline" 
                    style={props.style}>
                <Checkbox name={props.name} checked={props.checked} event={props.event} />
                <label htmlFor={props.name}>{props.labelText}</label>
            </label>
        </div>
    )
}

export const CheckboxInline = (props: CheckboxParameter) => {
    return (
        <label className="checkbox checkbox-inline" style={props.style}>
            <Checkbox name={props.name} checked={props.checked} event={props.event} />
            <label htmlFor={props.name}>{props.labelText}</label>
        </label>
    )
}
