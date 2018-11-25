import React from "react";

export const CompleteOrderFooter = (props: any) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <p>{props.PrintTemplate}</p>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="row">
                <div className="col-xs-offset-6 col-xs-6">
                    <div className="text-center">
                        <p>Ngày .... tháng .... năm 20......</p>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="row" style={{ paddingBottom: 200 }}>
                <div className="col-xs-6">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Đại diện khách hàng</strong></h3>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Phòng dịch vụ</strong></h3>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )
}
