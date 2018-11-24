import React from "react";
import { ICustomerType } from "../state/customer-type-state";
import { PagingProps, CombinedProps, CustomerTypePagingMapping } from "../redux-mapping/customer-type-paging-mapping";
import { CustomerTypeForm } from "./customer-type-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as Loading from "../../../component/common-helper/page-loading-helper";

class CustomerTypePaging extends BasePagingComponent<CombinedProps, ICustomerType> {
    
    pagingElementId = "customer-type-paging";
    navigationElementId = "customer-type-navigation";
    
    constructor(props: CombinedProps, state: IPaging<ICustomerType>) {
        super(props, state);
        this.onDeleteCustomerType = this.onDeleteCustomerType.bind(this);
    }

    initState() {
        initPagingState<ICustomerType>();
        this.initialState = this.state;
    }
    
    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteCustomerType(event) {
        event.preventDefault();
        this.props.delete({customerTypeId: this.state.SelectedIdOnRow });
    }
    
    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }

    renderEachPagingRecord(item: ICustomerType) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td className="text-center">
                    <Anchor click={() => { this.alertCreateOrUpdatePopup("loại khách hàng", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.alertConfirmDeletePopup("loại khách hàng", item.Id) }} 
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
                        onClick={() => this.onSorting("Id")}>Mã loại khách hàng</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên loại khách hàng</th>
                    <th className={this.showSortStatus("Description")}
                        onClick={() => this.onSorting("Description")}>Mô tả</th>
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
                                <h5>Danh sách loại khách hàng</h5>
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
                                                       click={() => this.alertCreateOrUpdatePopup("loại khách hàng")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <CustomerTypeForm reloadCustomerTypes={this.onLoadData}  
                                          closeModal={this.closeCreateOrUpdatePopup} 
                                          customerTypeId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteCustomerType, "loại khách hàng")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new CustomerTypePagingMapping().connectComponent(CustomerTypePaging);
export { connectedComponent as CustomerTypePaging };
