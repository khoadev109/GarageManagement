import React from "react";

export const loadingIcon = (props: any) => {
    return (
        <div id={props.container} className="sk-spinner sk-spinner-circle">
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
        </div>
    )
}

export function showLoading(isLoading: boolean, containerId: string) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    if (isLoading) {
        container.classList.add("sk-loading");
    } else {
        container.classList.remove("sk-loading");
    }
}
