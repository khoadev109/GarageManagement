import React from "react";

module AppCommon {
    export declare const $: any;

    export const DELETE_MESSAGE = (name: string) => {
        return `Xóa ${name} này?`;
    };
    
    export function setLayoutForFullPagePrinting() {
        $(".navbar-static-top").attr("style", "display: none;");
        $(".navbar-default").attr("style", "display: none;");
        $("#header").setAttribute("style", "margin: 0;");
        $("#page-wrapper").setAttribute("style", "margin: 0;");
        $("#print-form").setAttribute("style", "margin: auto; width: 98%");
    }
    
    export interface IBaseComponent {
        initState(): void;
    }
    
    export abstract class BaseComponent<P, S> extends React.Component<P, S> implements IBaseComponent {
        
        constructor(props: P, state: S) {
            super(props, state);
            this.initState();
        }
        
        public abstract initState() : void;

        protected isPropsChanged(currentTarget: any, newTarget: any) {
            return newTarget != currentTarget;
        }

        protected isSuccessResponseFromServer(newTarget: any) {
            return newTarget.Success;
        }

        protected isFailResponseFromServer(newTarget: any) {
            return !newTarget.Success;
        }

        protected getErrorMessageFromServer(newTarget: any) {
            return newTarget.Message ? newTarget.Message[0].ErrorMessage : "";
        }
    }
}

export default AppCommon;
