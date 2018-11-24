import React from "react";
import ReactDOM from "react-dom";
import { ICar } from "../../../../car/model/car-model";
import * as Loading from "component/common/loading-icon/loader";
import { formatNumberWithCommaSeparator } from "../../../../../core/library/data-type";

export const FullCarInfo = ({car}) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Thông tin xe</h5>
                            <div className="ibox-tools">
                                <a className="collapse-link">
                                    <i className="fa fa-chevron-up"></i>
                                </a>
                            </div>
                        </div>
                        <div className="ibox-content" id="full-car-info">
                            <Loading.loadingIcon container="full-car-info" />
                            <form role="form">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="control-label">Tên xe</label>
                                        <input type="hidden" name="CarId" value={car.Id} />
                                        <p>{`${car.ManufacturerName} ${car.ModelName} ${car.YearName}`}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="control-label">Biển số xe</label>
                                        <p>{car.LicensePlates}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="control-label">Số vin</label>
                                        <p>{car.VinNumber}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="control-label">Số máy</label>
                                        <p>{car.MachineNumber}</p>
                                    </div>
                                    <div className="col-md-1">
                                        <label className="control-label">Màu sắc</label>
                                        <p>{car.Color}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="control-label">Số Km</label>
                                        <p>{formatNumberWithCommaSeparator(car.Km)}</p>
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
