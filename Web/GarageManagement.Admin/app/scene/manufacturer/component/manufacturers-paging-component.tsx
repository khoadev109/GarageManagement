import React from "react";
import { IManufacturer } from "../state/manufacturer-state";
import { PagingProps, CombinedProps, ManufacturerPagingMapping } from "../redux-mapping/manufacturer-paging-mapping";
import { ManufacturerForm } from "./manufacturer-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as LoadingHelper from "../../../component/common-helper/page-loading-helper";

class ManufacturerPaging extends BasePagingComponent<CombinedProps, IManufacturer> {
    pagingElementId = "manufacturer-paging";
    navigationElementId = "manufacturer-navigation";
    
    constructor(props: CombinedProps, state: IPaging<IManufacturer>) {
        super(props, state);
        this.onDeleteManufacturer = this.onDeleteManufacturer.bind(this);
    }
    
    initState() {
        initPagingState<IManufacturer>();
        this.initialState = this.state;
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteManufacturer(event) {
        event.preventDefault();
        this.props.delete({ manufacturerId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }

    renderEachPagingRecord(item: IManufacturer) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td className="text-center">
                    <Anchor click={this.showCreateOrUpdatePopup.bind(this, "hãng sản xuất", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.showConfirmDeletePopup.bind(this, "hãng sản xuất", item.Id)} 
                            content={<i className="fa fa-times text-navy" aria-hidden="true"/>} />
                </td>
            </tr>
        )
    }

    renderPagingHeader() {
        return (
            <React.Fragment>
                <tr role="row">                           
                    <th className={this.showSortStatus("Id")}
                        onClick={() => this.onSorting("Id")}>Mã hãng sản xuất</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên hãng sản xuất</th>
                    <th className={this.showSortStatus("Address")}
                        onClick={() => this.onSorting("Address")}>Địa chỉ</th>
                    <th colSpan={2}></th>
                </tr>
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
                                <h5>Danh sách hãng sản xuất</h5>
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
                                                       click={this.showCreateOrUpdatePopup.bind(this, "hãng sản xuất")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <ManufacturerForm reloadManufacturers={this.onLoadData}  
                                          closeModal={this.closeCreateOrUpdatePopup} 
                                          manufacturerId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteManufacturer, "phụ tùng")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new ManufacturerPagingMapping().connectComponent(ManufacturerPaging);
export { connectedComponent as ManufacturerPaging };
