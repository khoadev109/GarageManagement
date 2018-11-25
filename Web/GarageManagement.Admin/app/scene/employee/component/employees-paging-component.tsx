import React from "react";
import { IEmployee } from "../state/employee-state";
import { EmployeeForm } from "./employee-form-component";
import { PagingProps, CombinedProps, EmployeePagingMapping } from "../redux-mapping/employee-paging-mapping";
import { initPagingState } from "core/state/paging-state-handler";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as Loading from "../../../component/common-helper/page-loading-helper";

class EmployeePaging extends BasePagingComponent<CombinedProps, IEmployee> {
    pagingElementId = "employee-paging";
    navigationElementId = "employee-navigation";

    constructor(props: any, state: IPaging<IEmployee>) {
        super(props, state);
        this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
    }

    initState() {
        initPagingState<IEmployee>();
        this.initialState = this.state;
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPagingData(this.state.Request);
    }

    onDeleteEmployee() {
        this.props.delete({ employeeId: this.state.SelectedIdOnRow });
    }

    renderEachPagingRecord(item: IEmployee) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Address}</td>
                <td>{item.BranchName}</td>
                <td>{item.Phone}</td>
                <td>{item.Email}</td>
                <td className="text-center">
                    <Anchor click={() => { this.showCreateOrUpdatePopup("nhân viên", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.showConfirmDeletePopup("nhân viên", item.Id) }} 
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
                        onClick={() => this.onSorting("Id")}>Mã chi nhánh</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên</th>
                    <th className={this.showSortStatus("Address")}
                        onClick={() => this.onSorting("Address")}>Địa chỉ</th>
                    {/* <th className={this.showSortStatus("BranchName")}
                        onClick={() => this.onSorting("Branch.Name")}>Chi nhánh</th>
                    <th className={this.showSortStatus("CustomerTypeName")}
                        onClick={() => this.onSorting("CustomerType.Name")}>Nhóm khách hàng</th> */}
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
                                <h5>Danh sách nhân viên</h5>
                            </div>

                            <div className="ibox-content" id={this.pagingElementId}>
                                <Loading.loadingIcon container={this.pagingElementId} />
                                
                                <div className="table-responsive">
                                <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                    <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                   click={() => this.showCreateOrUpdatePopup("nhân viên")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <EmployeeForm reloadEmployees={this.onLoadData}  
                                      closeModal={this.closeCreateOrUpdatePopup} 
                                      employeeId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteEmployee, "nhân viên")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new EmployeePagingMapping().connectComponent(EmployeePaging);
export { connectedComponent as EmployeePaging };
