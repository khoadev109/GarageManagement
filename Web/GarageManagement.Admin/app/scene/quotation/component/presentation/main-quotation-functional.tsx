import React from "react";
import { css } from 'glamor';
import { QuotationStatus } from "../../model/quotation-info-model";

export interface IQuotationFunctionalProps {
    IsValid: boolean,
    IsAgree: boolean,
    StatusId: number,
    NextStatus: string,
    PreviousStatus: string,
    CurrentStatus: string,
    PrintQuotation: () => void,
    CancelQuotation: () => void,
    OpenCustomerForm: () => void,
    SaveQuotation: () => void,
    ChangeToPreviousQuotationStatus: () => void,
    ChangeToNextQuotationStatus: () => void,
    AgreeThisStep: (event: any) => void
}

export const QuotationFunctional = (props: IQuotationFunctionalProps) => {
    let cursorPointerStyle = { cursor: "pointer" };
    let inlineStyle = { float: "right", marginLeft: 5 };
    let nextPreviousStepStyle = { cursor: "pointer", marginRight : 15 };
    
    let previousStep = null;
    if (props.StatusId != QuotationStatus.RequestFromCustomer) 
        previousStep = <div className="form-group"style={nextPreviousStepStyle}>
                            <i className="fa fa-arrow-left fa-2x" title={`Trở về bước ${props.PreviousStatus}`}
                            onClick={props.ChangeToPreviousQuotationStatus}>
                            <h3 style={inlineStyle}>{props.PreviousStatus}</h3>
                            </i>
                        </div>

    let nextStep = null;
    if (props.StatusId != QuotationStatus.CheckUp)
        nextStep = <div className="form-group"style={nextPreviousStepStyle}>
                        <i className="fa fa-arrow-right fa-2x" title={`Chuyển sang bước ${props.NextStatus}`}
                        onClick={props.ChangeToNextQuotationStatus}>
                        <h3 style={inlineStyle}>{props.NextStatus}</h3>
                        </i>
                    </div>
    
    let agreement = null;
    if (props.StatusId != QuotationStatus.CheckUp)
        agreement = <div className="form-group" style={{ marginRight : 15 }}>
                        <label className="checkbox checkbox-inline">
                            <input type="checkbox" id="agreement" style={{marginTop: 7, marginRight: 5}}
                                   checked={props.IsAgree} onChange={e => props.AgreeThisStep(e)} />
                            <label className="quotation-functional">
                                <strong>Duyệt</strong>
                            </label>
                        </label>
                    </div>
    
    return (
        <div className="ibox float-e-margins">
            <div className="ibox-content">
                <div className="row">
                    <div className="col-sm-7 text-left">
                        <div className="form-inline">
                            <div className="form-group" style={{ marginRight : 15 }}>
                                <i className="fa fa-times-circle fa-2x" title="Hủy báo giá" onClick={props.CancelQuotation}> 
                                   <h3 style={inlineStyle}>Hủy báo giá</h3>
                                </i>
                            </div>
                            <div className="form-group" style={{ marginRight : 15 }}>
                                <i className="fa fa-print fa-2x" title="In" style={cursorPointerStyle} onClick={props.PrintQuotation}>
                                   <h3 style={inlineStyle}>In</h3>
                                </i>
                            </div>
                            {previousStep}
                            {nextStep}
                        </div>
                    </div>
                    <div className="col-sm-5 text-right">
                        <div className="form-inline">
                            {agreement}
                            <div className="form-group" style={{ marginRight : 15 }}>
                                <button type="button" className="btn btn-w-m btn-primary" 
                                        onClick={props.OpenCustomerForm}>Cập nhật khách hàng</button>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-w-m btn-primary" 
                                        disabled={!props.IsValid} onClick={props.SaveQuotation}>Lưu báo giá</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
