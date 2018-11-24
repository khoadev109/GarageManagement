import * as React from "react";
import { Modal } from "react-bootstrap";
export class GeneralModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Modal, { bsSize: this.props.size, show: this.props.isOpen, onHide: this.props.close },
            React.createElement(Modal.Header, Object.assign({}, this.props.closeButton, { closeButton: true }),
                React.createElement(Modal.Title, null, this.props.title)),
            React.createElement(Modal.Body, null, this.props.children)));
    }
}
//# sourceMappingURL=modal.js.map