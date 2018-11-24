import React from "react";
import { Sizes, Modal } from "react-bootstrap";

export interface IModalPropsCallBack {
    close: () => void,
    closeButton?: React.Component<any, any>
}

export interface IModalProps extends IModalPropsCallBack {
    size: Sizes,
    isOpen: boolean,
    title: string,
}

export class GeneralModal extends React.Component<IModalProps, any> {
    constructor(props: IModalProps) {
        super(props);
    }

    render() {
        return (
            <Modal bsSize={this.props.size} backdrop={false} show={this.props.isOpen} onHide={this.props.close}>
                <Modal.Header {...this.props.closeButton} closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}
