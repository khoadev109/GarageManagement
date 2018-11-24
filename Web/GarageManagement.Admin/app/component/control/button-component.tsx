import React from "react";

interface ButtonParameter {
    text: string;
    moreClass?: string;
    disabled?: boolean;
    textAlign?: "text-center" | "text-right" | "text-left";
    click: any;
}

export const WrapperButton = (props: ButtonParameter) => {
    const wrapperClass = "col-sm-12" + (props.textAlign ? props.textAlign : " text-center");
    
    return (
        <div className={wrapperClass}>
            <Button text={props.text} moreClass={props.moreClass} 
                    disabled={props.disabled} click={props.click} />
        </div>
    )
}

export const Button = (props: ButtonParameter) => {
    const buttonClass = "btn btn-primary" + (props.moreClass ? ` ${props.moreClass}` : "");

    const clickEvent = props.click ? props.click : () => {};
    
    return (
        <button className={buttonClass} type="button"
                disabled={props.disabled} onClick={clickEvent}>
            {props.text}
        </button>
    )
}
