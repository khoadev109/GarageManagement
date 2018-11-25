import React from "react";
import { ICustomerInfo } from "../../state/customer-info-state";
import * as LoadingHelper from "../../../../component/common-helper/page-loading-helper";

export const CustomerInfo = (props: ICustomerInfo) => {
    return (
        <React.Fragment>
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>Thông tin khách hàng</h5>
                    <div className="ibox-tools">
                        <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div className="ibox-content" id="customer-info">
                    <LoadingHelper.loadingIcon container="customer-info" />
                    
                    <div className="row">
                        <div className="col-md-12">
                            <form role="form">
                                <div className="row">
                                    <div className="col-md-8 form-group">
                                        <input type="hidden" value={props.Customer.Id} />
                                        <label>Tên khách hàng</label>
                                        <input disabled type="text" placeholder="Tên khách hàng" className="form-control" value={props.Customer.Name} />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label>Điện thoại</label>
                                        <input disabled type="text" placeholder="Điện thoại" className="form-control" value={props.Customer.Phone} />
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Địa chỉ</label>
                                        <input disabled type="text" placeholder="Địa chỉ" className="form-control" value={props.Customer.Address} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Email</label>
                                        <input disabled type="text" placeholder="Email" className="form-control" value={props.Customer.Email} />
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="hidden" value={props.Customer.BranchId} />
                                        <label>Chi nhánh</label>
                                        <input disabled type="text" placeholder="Chi nhánh" className="form-control" value={props.Customer.BranchName} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="hidden" value={props.Customer.CustomerTypeId} />
                                        <label>Nhóm khách hàng</label>
                                        <input disabled type="text" placeholder="Nhóm khách hàng" className="form-control" value={props.Customer.CustomerTypeName} />
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
