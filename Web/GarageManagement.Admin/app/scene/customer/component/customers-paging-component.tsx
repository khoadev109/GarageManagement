import React from "react";
import AppCommon from "core/component/base-component";
import { ICustomer } from "../state/customer-state";
import { CustomerForm } from "./customer-form-component";
import { initPagingState } from "../../../core/state/paging-state-handler"
import { PagingProps, CombinedProps, CustomerPagingMapping } from "../redux-mapping/customer-paging-mapping";
import { BasePagingComponent, IPaging } from "../../../core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as Loading from "../../../component/common-helper/page-loading-helper";

class CustomerPaging extends BasePagingComponent<CombinedProps, ICustomer> {
    currentLicensePlate: any;
    pagingElementId = "customer-paging";
    navigationElementId = "customer-navigation";

    constructor(props: CombinedProps, state: IPaging<ICustomer>) {
        super(props, state);
        this.onDeleteCustomer = this.onDeleteCustomer.bind(this);
    }

    initState() {
        initPagingState<ICustomer>();
        this.initialState = this.state;
    }

    componentDidMount() {
        this.onLoadData();
    }

    componentDidUpdate() {
        this.showPopoverLicensePlate('.sorting_1');
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
        this.setLicensePlateResponseFromServer(nextProps);
    }
    
    onDeleteCustomer(event) {
        event.preventDefault();
        this.props.delete({ customerId: this.state.SelectedIdOnRow });
    }

    setLicensePlateResponseFromServer(nextProps: PagingProps) {
        const result = nextProps.uniqueCustomerResult.target;
        const isChanged = this.isPropsChanged(this.props.uniqueCustomerResult, result);
        const isSuccess = this.isSuccessResponseFromServer(result);

        if (isChanged && isSuccess && result.Data) {
            this.currentLicensePlate = result.Data.Car.LicensePlates;
        }
    }

    showPopoverLicensePlate(elementIdOrClass: string) {
        const options = {
            container: 'body',
            trigger: 'click',
            title: 'Biển số xe',
            content: () => this.currentLicensePlate
        }
        AppCommon.$(elementIdOrClass).popover(options);
    }
    
    getUniqueCustomer(customerId: string) {
        this.props.getUniqueCustomer(customerId);
    }

    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPagingData(this.state.Request);
    }
    
    renderEachPagingRecord(item: ICustomer) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1" onMouseEnter={this.getUniqueCustomer.bind(this, item.Id)}>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Address}</td>
                {/* <td>{item.BranchName}</td>
                <td>{item.CustomerTypeName}</td> */}
                <td>{item.Phone}</td>
                <td>{item.Email}</td>
                <td className="text-center">
                    <Anchor click={() => { this.showCreateOrUpdatePopup("khách hàng", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.showConfirmDeletePopup("khách hàng", item.Id) }} 
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
                        onClick={() => this.onSorting("Id")}>Mã khách hàng</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Họ tên</th>
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
                                <h5>Danh sách khách hàng</h5>
                            </div>
                            <div className="ibox-content" id="customers-paging">
                                <Loading.loadingIcon container="customers-paging" />
                                
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                   click={() => this.showCreateOrUpdatePopup("khách hàng")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.renderCreateOrUpdatePopup(
                        <CustomerForm reloadCustomers={this.onLoadData}  
                                      closeModal={this.closeCreateOrUpdatePopup} 
                                      customerId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteCustomer, "khách hàng")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new CustomerPagingMapping().connectComponent(CustomerPaging);
export { connectedComponent as CustomerPaging };
