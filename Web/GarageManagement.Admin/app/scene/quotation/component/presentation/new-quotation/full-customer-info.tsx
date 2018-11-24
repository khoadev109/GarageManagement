import React from "react";
import ReactDOM from "react-dom";
import { ICustomer } from "../../../../customer/model/customer-model";
import * as Loading from "component/common/loading-icon/loader";
import * as Locale from "core/locale/component/locale";

export const FullCustomerInfo = ({customer}) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Thông tin khách hàng</h5>
                            <div className="ibox-tools">
                                <a className="collapse-link">
                                    <i className="fa fa-chevron-up"></i>
                                </a>
                            </div>
                        </div>
                        <div className="ibox-content" id="full-customer-info">
                            <Loading.loadingIcon container="full-customer-info" />
                            <form role="form">
                                <div className="row">
                                    <div className="col-md-3 form-group">
                                        <label className="control-label">Họ và tên</label>
                                        <input type="hidden" name="CustomerId" value={customer.Id} />
                                        <p>{customer.Name}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Điện thoại</label>
                                        <p>{customer.Phone}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Chi nhánh</label>
                                        <p>{customer.BranchName}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Nhóm khách hàng</label>
                                        <p>{customer.CustomerTypeName}</p>
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <label className="control-label">Địa chỉ</label>
                                        <p>{customer.Address}</p>
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-3 form-group">
                                        <label className="control-label">Email</label>
                                        <p>{customer.Email}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Mã số thuế</label>
                                        <p>{customer.TaxCode}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Số tài khoản</label>
                                        <p>{customer.BankAccount}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Ngân hàng</label>
                                        <p>{customer.BankName}</p>
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <label className="control-label">Website</label>
                                        <p>{customer.Website}</p>
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-3 form-group">
                                        <label className="control-label">Tỉnh thành</label>
                                        <p>{customer.Province}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Quận / Huyện</label>
                                        <p>{customer.District}</p>
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="control-label">Phường / Xã</label>
                                        <p>{customer.Ward}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
