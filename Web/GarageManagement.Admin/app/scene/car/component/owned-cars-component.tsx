import React from "react";
import AppCommon from "core/component/base-component";
import { IModal } from "../../../core/state/modal-state";
import { GeneralModal } from "component/common/modal-component";
import { Button } from "../../../component/control/button-component";
import { Hr } from "../../../component/common/common-component";
import { IProps, CombinedProps, OwnedCarsMapping } from "../redux-mapping/owned-cars-mapping";
import ToastHelper from "../../../component/common-helper/toast-helper";

interface State extends IModal {
    CarId: string
}

class OwnedCars extends AppCommon.BaseComponent<CombinedProps, State> {
    private initialState: State;

    constructor(props: CombinedProps, state: State) {
        super(props, state);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    initState() {
        this.initialState = { CarId: "" };
        this.state = this.initialState;
    }

    onDeleteCar(event: any) {
        event.preventDefault();
        this.props.deleteOwnedCar({ carId: this.state.CarId, customerId: this.props.customerId });
    }

    reloadOwnedCars() {
        if (this.props.reloadOwnedCars)
            this.props.reloadOwnedCars();
    }

    clearInfoAndAddNewCar() {
        if(this.props.clearInfoAndAddNewCar)
            this.props.clearInfoAndAddNewCar();
    }

    selectSpecificCarToLoad(carId: string) {
        if(this.props.selectSpecifyCarToLoad)
            this.props.selectSpecifyCarToLoad(carId);
    }

    showConfirmDeleteModal(carId: string) {
        this.setState({
            Title: "Xóa xe",
            CarId: carId,
            IsOpenDeleteModal: true
        });
    }

    closeDeleteModal() {
        this.setState({
            Title: "",
            CarId: "",
            IsOpenDeleteModal: false
        });
    }

    componentWillReceiveProps(nextProps: IProps) {
        const deleteResult = nextProps.deleteResult.target;
        const isChanged = this.isPropsChanged(this.props.deleteResult.target, deleteResult);

        if (isChanged) {
            const isSuccess = this.isSuccessResponseFromServer(deleteResult);
            if (isSuccess) {
                ToastHelper.notifySuccess("Đã xóa xe");
                this.initialState.IsOpenDeleteModal = false;
                this.setState(this.initialState);
                this.reloadOwnedCars();
            } else {
                ToastHelper.notifyError("Lỗi xảy ra khi xóa xe");
            }
        }
    }

    renderCars() {
        return (
            this.props.cars.map(car => {
                return(
                    <React.Fragment key={car.Id}>
                        <div className="search-result">
                            <div className="row">
                            <div className="col-sm-8">
                                    <input type="hidden" value={car.Id} />
                                    <h3>
                                        <a href="javascript:void(0);" onClick={this.selectSpecificCarToLoad.bind(this, car.Id)}>
                                            {car.LicensePlates}
                                        </a>
                                    </h3>
                                    <p>{car.Name}</p>
                            </div>
                            <div className="col-sm-4 text-right">
                                <i className="fa fa-2x fa-times text-navy" title="Xóa khỏi danh sách" 
                                   onClick={this.showConfirmDeleteModal.bind(this, car.Id)} />
                            </div>
                            </div>
                        </div>
                        <Hr />
                    </React.Fragment>
                )
            })
        )
    }

    renderButtonAddNewCar() {
        if (this.props.clearInfoAndAddNewCar) {
            return <Button click={this.clearInfoAndAddNewCar} text="Thêm xe" textAlign="text-right" />
        }
        return null
    }

    render() {    
        return (
            <React.Fragment>
                <div className="ibox float-e-margins">
                    <div className="row form-group">
                        <div className="col-sm-6">
                            <h3>Có {this.props.cars.length} xe</h3>
                            <small>(Chọn xe để cập nhật)</small>
                            <br/><br/>
                        </div>
                        <div className="col-sm-6 text-right">
                            { this.renderButtonAddNewCar() }
                        </div>
                    </div>
                    <Hr />
                    <div className="row form-group">
                        <div className="col-sm-12">
                        { this.renderCars() }
                        </div>
                    </div>
                </div>
                
                <GeneralModal size={"small"} title={this.state.Title} isOpen={this.state.IsOpenDeleteModal} close={this.closeDeleteModal}>
                    <div className="text-center">
                        <div>{AppCommon.DELETE_MESSAGE("xe")}</div>
                        <br />
                        <Button click={this.onDeleteCar.bind(this)} text="OK" />
                    </div>
                </GeneralModal>

            </React.Fragment>
        );
    }
}

const connectedComponent = new OwnedCarsMapping().connectComponent(OwnedCars);
export { connectedComponent as OwnedCars };
