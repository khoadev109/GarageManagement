import React from "react";

export const RepairCommandFooter = (props: any) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <p>{props.PrintTemplate}</p>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="row" style={{ paddingBottom: 200 }}>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Cố vấn dịch vụ</strong></h3>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Tổ trưởng</strong></h3>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Quản đốc</strong></h3>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    );
}
