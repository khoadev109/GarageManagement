import React from "react";

export const MaterialExportFooter = (props: any) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <p>{props.PrintTemplate}</p>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="row" style={{ paddingBottom: 200 }}>
                <div className="col-xs-6">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Cố vấn dịch vụ</strong></h3>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="text-center">
                        <h3><strong className="text-uppercase">Thủ kho</strong></h3>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )
}
