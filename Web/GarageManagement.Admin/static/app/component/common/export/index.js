import * as React from "react";
export class Export extends React.Component {
    constructor(props) {
        super(props);
    }
    showCopyFunction() {
        if (this.props.canShowCopy == null || this.props.canShowCopy) {
            return (React.createElement("a", { className: "btn btn-default buttons-copy buttons-html5", tabIndex: 0, href: "#" },
                React.createElement("span", null, "Copy")));
        }
    }
    showCSVExportFunction() {
        if (this.props.canShowCSVExport == null || this.props.canShowCSVExport) {
            return (React.createElement("a", { className: "btn btn-default buttons-csv buttons-html5", tabIndex: 0, href: "#" },
                React.createElement("span", null, "CSV")));
        }
    }
    showExcelExportFunction() {
        if (this.props.canShowExcelExport == null || this.props.canShowExcelExport) {
            return (React.createElement("a", { className: "btn btn-default buttons-excel buttons-html5", tabIndex: 0, href: "#" },
                React.createElement("span", null, "Excel")));
        }
    }
    showPDFExportFunction() {
        if (this.props.canShowPDFExport == null || this.props.canShowPDFExport) {
            return (React.createElement("a", { className: "btn btn-default buttons-pdf buttons-html5", tabIndex: 0, href: "#" },
                React.createElement("span", null, "PDF")));
        }
    }
    showPrintFunction() {
        if (this.props.canShowPrint == null || this.props.canShowPrint) {
            return (React.createElement("a", { className: "btn btn-default buttons-print", tabIndex: 0, href: "#" },
                React.createElement("span", null, "In")));
        }
    }
    render() {
        return (React.createElement("div", { className: "html5buttons" },
            React.createElement("div", { className: "dt-buttons btn-group" },
                this.showCSVExportFunction(),
                this.showExcelExportFunction(),
                this.showPDFExportFunction())));
    }
}
//# sourceMappingURL=index.js.map