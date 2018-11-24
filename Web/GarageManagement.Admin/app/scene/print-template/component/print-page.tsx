import React from "react";
import { QuotationStatus } from "../../quotation/model/quotation-info-model";
import { ToastContainer } from "react-toastify";
import { IFormProps, CombinedProps, PrintPageMapping } from "../redux-mapping/print-page-mapping";
import { IPrintTemplateState } from "../state/print-page-state";
import AppCommon from "core/component/base-component";
import StateResponse from "../state/response-state-handler";

class PrintTemplate extends AppCommon.BaseComponent<any, IPrintTemplateState> {

    public initState(): void {
        this.state = {
            Id: 0,
            Content: "",     
            StatusId: 0,       
            SelectedQuotationStep: QuotationStatus.RequestFromCustomer
        }
    }

    setActiveStep(statusId: number) {
        let itemClass = ["text-center"];
        if (statusId == this.state.SelectedQuotationStep){
            itemClass.push("quotation-active");
        }
        return itemClass.join(" ");
    }

    selectQuotationStep(statusId: number) {
        this.setState({ StatusId: statusId, SelectedQuotationStep: statusId });
        this.props.getTemplateByStatus(statusId);
    }

    inputEvent(event: any) {
        this.setState({ Content: event.target.value });        
    }

    savePrintTemplate() {
        this.props.addOrUpdateTemplateAction(this.state);
    }

    componentDidMount() {
        this.props.getTemplateByStatus(this.state.SelectedQuotationStep);
    }

    componentWillReceiveProps(nextProps: IFormProps){
        this.setStateForPrintTemplateResponse(nextProps);        
        this.setStateForAddOrUpdatePrintTemplateResponse(nextProps);
    }

    setStateForPrintTemplateResponse(nextProps: IFormProps){
        let getPrintTemplateResult = nextProps.getPrintTemplateByStatusResult.target;
        let isChanged = this.isPropsChanged(this.props.getPrintTemplateByStatusResult.target, getPrintTemplateResult);

        if(isChanged && getPrintTemplateResult.Success) {
            StateResponse.setStateForPrintTemplateResponse(getPrintTemplateResult.Data);
        }
    }

    setStateForAddOrUpdatePrintTemplateResponse(nextProps: IFormProps){
        let addOrUpdateResult = nextProps.addOrUpdateTemplateResult.target;
        let isChanged = this.isPropsChanged(this.props.addOrUpdateTemplateResult.target, addOrUpdateResult);

        if (isChanged) {
            StateResponse.setStateForAddOrUpdatePrintTemplateResponse(addOrUpdateResult);
            this.props.getTemplateByStatus(this.state.SelectedQuotationStep);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Bước báo giá</h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content" id="pending-quotations" style={{height: "576px", overflowY: "auto"}}>
                                    <ul className="todo-list m-t ui-sortable">
                                        <li key={QuotationStatus.RequestFromCustomer} className={this.setActiveStep(QuotationStatus.RequestFromCustomer)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.RequestFromCustomer)}>
                                                Tiếp nhận xe
                                            </a>
                                        </li>
                                        <li key={QuotationStatus.Quotation} className={this.setActiveStep(QuotationStatus.Quotation)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.Quotation)}>
                                                Báo giá
                                            </a>
                                        </li>
                                        <li key={QuotationStatus.RepairCommand} className={this.setActiveStep(QuotationStatus.RepairCommand)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.RepairCommand)}>
                                                Lệnh sửa chữa
                                            </a>
                                        </li>
                                        <li key={QuotationStatus.ExportMaterial} className={this.setActiveStep(QuotationStatus.ExportMaterial)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.ExportMaterial)}>
                                                Xuất vật tư
                                            </a>
                                        </li>
                                        <li key={QuotationStatus.Complete} className={this.setActiveStep(QuotationStatus.Complete)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.Complete)}>
                                                Hoàn thành
                                            </a>
                                        </li>
                                        <li key={QuotationStatus.CheckUp} className={this.setActiveStep(QuotationStatus.CheckUp)}>
                                            <a href="javascript:void(0);" className="m-l-xs" onClick={() => this.selectQuotationStep(QuotationStatus.CheckUp)}>
                                                Nghiệm thu
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Nội dung</h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-md-7 form-group">
                                            <textarea className="form-control" name="Note" rows={10} placeholder="Mẫu in"
                                                      onInput={e => this.inputEvent(e)} value={this.state.Content} />
                                        </div>
                                        <div className="col-md-5" style={{marginTop: 20}}>
                                        <button type="button" className="btn btn-w-m btn-primary" 
                                                onClick={this.savePrintTemplate}>Lưu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
            </React.Fragment>
        )
    }
}

const connectedPrintTemplate = new PrintPageMapping().connectComponent(PrintTemplate);
export { connectedPrintTemplate as PrintTemplate };
