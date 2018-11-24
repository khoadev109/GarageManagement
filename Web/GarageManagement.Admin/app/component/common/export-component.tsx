import * as React from "react";
//import {ExcelFile, ExcelSheet} from "react-data-export";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { CSVLink } from 'react-csv';

export interface IExportProps {
    canShowCopy?: boolean,
    canShowCSVExport?: boolean,
    canShowExcelExport?: boolean,
    canShowPDFExport?: boolean,
    canShowPrint?: boolean,
    tableId?: string,
    tableName?: string,
    data?: any
}

export class Export extends React.Component<IExportProps> {
    constructor(props: IExportProps) {
        super(props);
    }

    showCopyFunction() {
        if (this.props.canShowCopy == null || this.props.canShowCopy) {
            return (
                <button className="btn btn-default buttons-copy buttons-html5" tabIndex={0}>
                    <span>Copy</span>
                </button>
            )
        }
    }

    showCSVExportFunction() {
        if (this.props.canShowCSVExport == null || this.props.canShowCSVExport) {
            return (
                // <button className="btn btn-default buttons-csv buttons-html5" tabIndex={0}>
                //     <span>CSV</span>
                // </button>
                <CSVLink className="btn btn-default buttons-csv buttons-html5" data={this.props.data}>CSV</CSVLink>
            )
        }
    }

    showExcelExportFunction() {
        if (this.props.canShowExcelExport == null || this.props.canShowExcelExport) {
            return (
                <ReactHTMLTableToExcel
                    id="excelButton"
                    tabIndex={0}
                    className="btn btn-default buttons-excel buttons-html5"
                    table={this.props.tableId}
                    filename={this.props.tableName}
                    sheet={this.props.tableName}
                    buttonText="Excel" />
                // <ExcelFile element={<button>Excel</button>}>
                //     <ExcelSheet dataSet={this.props.data} name="Organization"/>
                // </ExcelFile>
            )
        }
    }

    showPDFExportFunction() {
        if (this.props.canShowPDFExport == null || this.props.canShowPDFExport) {
            let funcJs = `javascript:pdfFromHTML("${this.props.tableId}", "${this.props.tableName}");`
            return (
                <a className="btn btn-default buttons-pdf buttons-html5" tabIndex={0} href={funcJs}>
                    <span>PDF</span>
                </a>
            )
        }
    }

    showPrintFunction() {
        if (this.props.canShowPrint == null || this.props.canShowPrint) {
            return (
                <button className="btn btn-default buttons-print" tabIndex={0}>
                    <span>In</span>
                </button>
            )
        }
    }

    render() {
        return (
            <div className="html5buttons">
                <div className="dt-buttons btn-group">
                    {/* { this.showCopyFunction() } */}

                    {this.showCSVExportFunction()}

                    {this.showExcelExportFunction()}

                    {this.showPDFExportFunction()}

                    {/* { this.showPrintFunction() } */}
                </div>
            </div>
        );
    }
}    
