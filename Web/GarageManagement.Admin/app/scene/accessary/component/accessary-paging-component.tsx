import React from "react";
import { IAccessary } from "../state/accessary-state";
import { AccessaryForm } from "./accessary-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { PagingProps, CombinedProps, AccessaryPagingMapping } from "../redux-mapping/accessary-paging-mapping";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "component/control/anchor-component";
import { WrapperButton } from "component/control/button-component";
import * as LoadingHelper from "component/common-helper/page-loading-helper";

class AccessaryPaging extends BasePagingComponent<CombinedProps, IAccessary> {
    pagingElementId = "accessary-paging";
    navigationElementId = "accessary-navigation";
    
    constructor(props: CombinedProps, state: IPaging<IAccessary>) {
        super(props, state);
        this.onDeleteAccessary = this.onDeleteAccessary.bind(this);
    }
    
    initState() {
        initPagingState<IAccessary>();
        this.initialState = this.state;
    }
    
    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteAccessary(event: any) {
        event.preventDefault();
        this.props.delete({ accessaryId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }

    renderEachPagingRecord(item: IAccessary) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.BarCode}</td>
                <td>{item.Price}</td>
                <td><input type="checkbox" disabled { ...item.OutOfStock && { "checked" : false }} /></td>
                <td className="text-center">
                    <Anchor click={this.alertCreateOrUpdatePopup.bind(this, "phụ tùng", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.alertConfirmDeletePopup.bind(this, "danh mục", item.Id)} 
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
                        onClick={() => this.onSorting("Id")}>Mã phụ tùng</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên phụ tùng</th>
                    <th className={this.showSortStatus("BarCode")}
                        onClick={() => this.onSorting("BarCode")}>Mã vạch</th>
                    <th className={this.showSortStatus("Price")}
                        onClick={() => this.onSorting("Price")}>Giá phụ tùng</th>
                    <th className={this.showSortStatus("OutOfStock")}
                        onClick={() => this.onSorting("OutOfStock")}>Còn hàng</th>
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
                                <h5>Danh sách phụ tùng</h5>
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
                                                       click={this.alertCreateOrUpdatePopup.bind(this, "phụ tùng")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.renderCreateOrUpdatePopup(
                        <AccessaryForm reloadAccessaries={this.onLoadData}  
                                       closeModal={this.closeCreateOrUpdatePopup} 
                                       accessaryId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteAccessary, "phụ tùng")}
                {this.renderToastContainer()}
            </React.Fragment>
        )
    }
}

const connectedComponent = new AccessaryPagingMapping().connectComponent(AccessaryPaging);
export { connectedComponent as AccessaryPaging };
