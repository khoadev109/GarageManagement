import { Sizes } from "react-bootstrap";

export const xsSize: Sizes = "xs";
export const xSmallSize: Sizes = "xsmall";
export const smSize: Sizes = "sm";
export const smallSize: Sizes = "small";
export const mediumSize: Sizes = "medium";
export const lgSize: Sizes = "lg";
export const largeSize: Sizes = "large";

export interface IModal extends IModalCallBack {
    Title?: string,
    IsOpenGeneralModal?: boolean,
    IsOpenDeleteModal?: boolean,
    IsOpenCreateOrUpdateModal?: boolean
}

export interface IModalCallBack {
    Close?: (isClose: boolean) => void,
    Open?: (title: string, size: Sizes, isOpen: boolean) => void
}
