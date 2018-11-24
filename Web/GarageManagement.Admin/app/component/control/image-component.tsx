import React from "react";

interface ImageParameter {
    src: any;
    class?: string;
    width?: string;
    height?: string;
}

export const Image = (props: ImageParameter) => {
    let className = "img-responsive";
    if (props.class) {
        className += ` ${props.class}`;
    }
    
    return (
        <img src={this.state.Garage.Logo} className="img-responsive" width={props.width} height={props.height} />
    )
}
