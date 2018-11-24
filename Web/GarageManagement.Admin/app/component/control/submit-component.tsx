import React from "react";

interface SubmitParameter {
    text?: string;
    disabled?: boolean;
    class?: string;
    textAlign?: "text-center" | "text-right" | "text-left";
}

export const SubmitCenter = (props: SubmitParameter) => {
    const wrapperClass = "col-sm-12" + (props.textAlign ? props.textAlign : " text-center");

    return (
        <div className="form-group">
            <div className={wrapperClass}>
                <Submit class="btn btn-primary" disabled={props.disabled} />
            </div>
        </div>
    )
}

export const Submit = (props: SubmitParameter) => {
    return <button type="submit" className={props.class} disabled={props.disabled}>
                {props.text ? props.text : "Lưu"}
           </button>
}
