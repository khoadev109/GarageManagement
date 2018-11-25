import React from "react";
import { IBranch } from "../state/branch-state";
import { BranchForm } from "./branch-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { PagingProps, CombinedProps, BranchPagingMapping } from "../redux-mapping/branch-paging-mapping";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as Loading from "../../../component/common-helper/page-loading-helper";

class BranchPaging extends BasePagingComponent<CombinedProps, IBranch> {
    
    pagingElementId = "branch-paging";
    navigationElementId = "branch-navigation";

    constructor(props: CombinedProps, state: IPaging<IBranch>) {
        super(props, state);
        this.onDeleteBranch = this.onDeleteBranch.bind(this);
    }

    initState() {
        initPagingState<IBranch>();
        this.initialState = this.state;
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteBranch(event) {
        event.preventDefault();
        this.props.delete({ branchId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPagingData(this.state.Request);
    }

    renderEachPagingRecord(item: IBranch) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Address}</td>
                {/* <td>{item.BranchName}</td>
                <td>{item.CustomerTypeName}</td> */}
                <td>{item.Phone}</td>
                <td>{item.Email}</td>
                <td className="text-center">
                    <Anchor click={() => { this.showCreateOrUpdatePopup("chi nhánh", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.showConfirmDeletePopup("chi nhánh", item.Id) }} 
                            content={<i className="fa fa-times text-navy" aria-hidden="true"/>} />
                </td>
            </tr>
        );
    }

    renderPagingHeader() {
        return (
            <React.Fragment>
                <tr role="row">
                    <th className={this.showSortStatus("Id")}
                        onClick={() => this.onSorting("Id")}>Mã nhân viên</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Họ tên</th>
                    <th className={this.showSortStatus("Address")}
                        onClick={() => this.onSorting("Address")}>Địa chỉ</th>
                    <th className={this.showSortStatus("BranchName")}
                        onClick={() => this.onSorting("Branch.Name")}>Chi nhánh</th>                                                    
                    <th className={this.showSortStatus("Phone")}
                        onClick={() => this.onSorting("Phone")}>Điện thoại</th>
                    <th className={this.showSortStatus("Email")}
                        onClick={() => this.onSorting("Email")}>Email</th>
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
                                <h5>Danh sách chi nhánh</h5>
                            </div>
                            <div className="ibox-content" id={this.pagingElementId}>
                                <Loading.loadingIcon container={this.pagingElementId} />=
                                
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                       click={() => this.showCreateOrUpdatePopup("chi nhánh")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <BranchForm reloadBranches={this.onLoadData}  
                                    closeModal={this.closeCreateOrUpdatePopup} 
                                    branchId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteBranch, "chi nhánh")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new BranchPagingMapping().connectComponent(BranchPaging);
export { connectedComponent as BranchPaging };
