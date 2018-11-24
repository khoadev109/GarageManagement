import React from "react";
import ReactDOM from "react-dom";
import { IPaySlip } from "../../../../model/bill-model";
import { formatNumberWithCommaSeparator } from "../../../../../../core/library/data-type";

interface IPaySlipInfoProps {
    Information: IPaySlip,
    CustomerCar: JSX.Element
}

export const PaySlipInfo = (props: IPaySlipInfoProps) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <div>
                        <div>
                            <div className="table-responsive">
                                <table className="table print-page">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "18%" }}></th>
                                            <th style={{ width: "32%" }}></th>
                                            <th style={{ width: "25%" }}></th>
                                            <th style={{ width: "25%" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Người nhận tiền:</td>
                                            <td><strong>{props.Information.Receiver}</strong></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {props.CustomerCar}
                                        <tr>
                                            <td>Số tiền:</td>
                                            <td><strong>{formatNumberWithCommaSeparator(props.Information.Money)}</strong></td>
                                            <td>Số tiền (bằng chữ)</td>
                                            <td><strong>{props.Information.MoneyText}</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>
                                                Lý do / Nội dung:
                                                <p style={{marginTop: 10}}>{props.Information.Content}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>
                                                Kèm theo:
                                                <p style={{marginTop: 10}}>{props.Information.Attach}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-offset-6 col-xs-6">
                    <div className="text-right">
                        <p>Ngày .... tháng .... năm 20 ....</p>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="row" style={{ paddingTop: 50, paddingBottom: 200 }}>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Người nhận tiền</strong></h3>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Kế toán</strong></h3>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Giám đốc / Quản lý</strong></h3>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    );
}
