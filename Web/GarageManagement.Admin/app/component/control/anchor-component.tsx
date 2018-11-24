import React from "react";

interface AnchorParameter {
    href?: any;
    class?: string;
    click?(): void;
    content?: any;
}

export const Anchor = (props: AnchorParameter) => {
    const href = props.href ? props.href : "javascript:void(0);";
    const className = props.class ? props.class : "";
    const clickEvent = props.click ? props.click : () => {};
    
    return (
        <a className={className} href={href} onClick={clickEvent}>
            {props.content}
        </a>
    )
}
