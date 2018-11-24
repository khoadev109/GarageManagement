import React from "react";

interface FileParameter {
    name: string;
    labelText?: string;
    event: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const File = (props: FileParameter) => {
    
    return (
        <React.Fragment>
            <label className="btn btn-success" htmlFor={props.name}>{props.labelText}</label>
            <input type="file" className="sr-only" name={props.name} onChange={props.event} />
        </React.Fragment>
    )
}
