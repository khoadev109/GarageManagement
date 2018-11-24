import React from "react";

interface TextareaParameter {
    name: string;
    value: any;
    labelText?: string;
    isRequired?: boolean;
    event: (event: React.FormEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = (props: TextareaParameter) => {
    return (
        <textarea className="form-control" /*cols={80}*/ rows={10} 
                    name={props.name} value={props.value} 
                    onInput={props.event} />
    )
}

export const TextareaWithLabelHorizontal = (props: TextareaParameter) => {
    const labelClass = "col-sm-3 control-label" + (props.isRequired ? " required" : "");

    return (
        <div className="form-group">
            <label className={labelClass}>{props.labelText}</label>
            <div className="col-sm-9">
                <Textarea name={props.name} value={props.value} 
                          event={props.event} />
            </div>
        </div>
    )
}
