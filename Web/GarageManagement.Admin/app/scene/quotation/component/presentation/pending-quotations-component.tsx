import React from "react";
import { QuotationStatus } from "../../state/quotation-info-state";
import { NoDataText } from "component/common/paging/nodata-component";
import { setStatusForCurrentQuotation } from "../../state/initialization";
import * as LoadingHelper from "../../../../component/common-helper/page-loading-helper";

interface IPendingQuotationsProp {
    SelectingQuotationId: string,
    StatusId: number,
    Quotations: Array<string>,
    OnSelectQuotation?: (quotationId: string) => void,
    OnSearchQuotations?: (statusId: number, searchTerm: string) => void
} 

export class PendingQuotations extends React.Component<IPendingQuotationsProp, any> {
    constructor(props: IPendingQuotationsProp) {
        super(props);
        this.selectQuotation = this.selectQuotation.bind(this);
        this.findPendingQuotations = this.findPendingQuotations.bind(this);
    }

    findPendingQuotations(event: any) {
        this.props.OnSearchQuotations(this.props.StatusId, event.target.value);
    }

    setActiveQuotation(quotationId: string) {
        let itemClass = ["text-center"];
        if (quotationId == this.props.SelectingQuotationId) 
            itemClass.push("quotation-active");
        return itemClass.join(" ");
    }
    
    selectQuotation(quotationId: string) {
        this.props.OnSelectQuotation(quotationId);
    }

    renderQuotation(licensePlates: string) {
        if (licensePlates != "") {
            licensePlates = `(${licensePlates})`;
            return(
                <React.Fragment>
                    <br /><small className="font-bold" title="Biển số xe">{licensePlates}</small>
                </React.Fragment>
            );
        }
    }

    renderPendingQuotations() {
        let result = this.props.Quotations;
        if (result)
            return (
                <ul className="todo-list m-t ui-sortable">
                    { 
                        result.length ?
                        result.map((quotation, i) => { 
                            let quotationsSplitted = quotation.split(",", 2);
                            let quotationId = quotationsSplitted[0];
                            let licensePlates = quotationsSplitted[1];

                            return (
                                <li key={quotationId} className={this.setActiveQuotation(quotationId)}>
                                    <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotation(quotationId)}>
                                        <span title="Mã báo giá">{quotationId}</span>
                                        {this.renderQuotation(licensePlates)}
                                    </a>
                                </li>
                            )
                        }) : <NoDataText /> 
                    }
                </ul>
            );
    }

    render() {
        return (
            <React.Fragment>
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>{ setStatusForCurrentQuotation(QuotationStatus[this.props.StatusId]) }</h5>
                        <div className="ibox-tools">
                            <a className="collapse-link">
                                <i className="fa fa-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div className="ibox-content" id="pending-quotations" style={{height: "568px", overflowY: "auto"}}>
                        <LoadingHelper.loadingIcon container="pending-quotations" />

                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Tìm kiếm" className="form-control"
                                       onChange={e => this.findPendingQuotations(e)} />
                            </div>
                        </div>
                        <br/>
                        <small className="text-center">Tìm theo: Mã báo giá / Biển số xe</small>
                        { this.renderPendingQuotations() }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
