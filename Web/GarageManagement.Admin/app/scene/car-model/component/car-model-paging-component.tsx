import React from "react";
import { ICarModel } from "../state/car-model-state";
import { CarModelForm } from "./car-model-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { PagingProps, CombinedProps, CarModelPagingMapping } from "../redux-mapping/car-model-paging-mapping";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as LoadingHelper from "../../../component/common-helper/page-loading-helper";

class CarModelPaging extends BasePagingComponent<CombinedProps, ICarModel> {
    pagingElementId = "car-model-paging";
    navigationElementId = "car-model-navigation";
    
    constructor(props: CombinedProps, state: IPaging<ICarModel>) {
        super(props, state);
        this.onDeleteCarModel = this.onDeleteCarModel.bind(this);
    }
    
    initState() {
        initPagingState<ICarModel>();
        this.initialState = this.state;
    }

    onDeleteCarModel(event) {
        event.preventDefault();
        this.props.delete({ carModelId: this.state.SelectedIdOnRow });
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }

    renderEachPagingRecord(item: ICarModel) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.ManufacturerName}</td>
                <td>{item.StyleName}</td>
                <td className="text-center">
                    <Anchor click={this.showCreateOrUpdatePopup.bind(this, "dòng xe", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.showConfirmDeletePopup.bind(this, "dòng xe", item.Id)} 
                            content={<i className="fa fa-times text-navy" aria-hidden="true"/>} />
                </td>
            </tr>
        )
    }

    renderPagingHeader() {
        return (
            <React.Fragment>
                <th className={this.showSortStatus("Id")}
                    onClick={() => this.onSorting("Id")}>Mã dòng xe</th>
                <th className={this.showSortStatus("Name")}
                    onClick={() => this.onSorting("Name")}>Tên dòng xe</th>
                <th className={this.showSortStatus("ManufacturerName")}
                    onClick={() => this.onSorting("ManufacturerName")}>Hãng sản xuất</th>
                <th className={this.showSortStatus("StyleName")}
                    onClick={() => this.onSorting("StyleName")}>Kiểu dáng xe</th>
                <th colSpan={2}></th>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Danh sách dòng xe</h5>
                            </div>

                            <div className="ibox-content" id={this.pagingElementId}>
                                <LoadingHelper.loadingIcon container={this.pagingElementId} />

                                <div className="table-responsive">                                    
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                       click={this.showCreateOrUpdatePopup.bind(this, "dòng xe")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <CarModelForm reloadCarModels={this.onLoadData}  
                                      closeModal={this.closeCreateOrUpdatePopup} 
                                      carModelId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteCarModel, "dòng xe")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new CarModelPagingMapping().connectComponent(CarModelPaging);
export { connectedComponent as CarModelPaging };
