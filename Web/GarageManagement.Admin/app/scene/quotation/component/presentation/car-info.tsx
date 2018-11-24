import React from "react";
import ReactDOM from "react-dom";
import * as Loading from "component/common/loading-icon/loader";
import { formatNumberWithCommaSeparator } from "../../../../core/library/data-type";

export const CarInfo = (props: any) => {
    let carName = `${props.Car.ManufacturerName} ${props.Car.ModelName} ${props.Car.YearName}`;
    if (!props.Car.ManufacturerName && !props.Car.ModelName && !props.Car.YearName)
        carName = "";
    
    return (
        <React.Fragment>
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>Thông tin xe</h5>
                    <div className="ibox-tools">
                        <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div className="ibox-content" id="car-info">
                    <Loading.loadingIcon container="car-info" />
                    <div className="row">
                        <div className="col-md-12">
                            <form role="form">
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <input type="hidden" value={props.Car.Id} />
                                        <label>Tên xe (Hãng xe - Dòng xe - Năm sản xuất)</label>
                                        <input type="text" placeholder="Hãng xe - Dòng xe - Năm sản xuất" 
                                               className="form-control" disabled value={carName} />
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Biển số</label>
                                        <input type="text" placeholder="Biển số" className="form-control"
                                               value={props.Car.LicensePlates} disabled />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Số Vin</label>
                                        <input type="text" placeholder="Số Vin" className="form-control"
                                               value={props.Car.VinNumber} disabled />
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Màu sắc</label>
                                        <input type="text" placeholder="Màu sắc" className="form-control" 
                                               value={props.Car.Color} disabled />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Số Km</label>
                                        <input type="text" placeholder="Km" className="form-control"
                                               value={formatNumberWithCommaSeparator(props.Car.Km)} disabled />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}