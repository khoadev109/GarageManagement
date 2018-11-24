import React from "react";

interface SearchBoxParameter {
    placeholder?: string;
    value: any;
    changeEvent: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbox = (props: SearchBoxParameter) => {
    const placeholder = props.placeholder ? props.placeholder : "Tìm kiếm";
    
    return (
        <input type="search" placeholder={placeholder}
                className="form-control input-sm"
                value={props.value} onChange={props.changeEvent} />
    )
}
