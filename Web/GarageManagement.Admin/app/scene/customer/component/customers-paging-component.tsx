import React from "react";
import { ToastContainer } from "react-toastify";

import * as BaseComponent from "core/component/component";
import * as PagingModel from "core/component/model";
import * as PagingNavigation from "../../../../core/control/paging/index";
import * as FetchAction from "../action/fetch-action";
import * as PostAction from "../action/post-action";

import { ICustomer } from "../model/customer-model";

import { SortDirection } from "core/component/model";
import { Export } from "component/common/export-component";
import { ItemsPerPage } from "component/common/paging/items-perpage-component";
import { NoData } from "component/common/paging/nodata-component";
import { GeneralModal } from "component/common/modal-component";
import { CustomerForm } from "./customer-form-component";
import * as Loading from "component/common/loading-icon/loader";
import * as ToastHelper from "component/common/toast/toast";

import { PagingProps, CombinedProps, CustomerPagingMapping } from "../redux-mapping/customers-paging-mapping";

interface ICustomerState extends PagingModel.IPaging<ICustomer> { }

declare let $: any;

class CustomerPaging extends React.Component<any, ICustomerState> implements BaseComponent.IComponentState {
    private pageSize: number = 10;
    private numberPageRangeDisplay: number = 3;
    private isSelectItemsPerPage: boolean = false;
    private initialState: PagingModel.IPaging<ICustomer>;
    private pagingNavigation: PagingNavigation.NavigationSetting<ICustomer>;
    private currentLicensePlate: string;

    constructor(props: any) {
        super(props);

        this.onSearchInput = this.onSearchInput.bind(this);
        this.onLoadCustomers = this.onLoadCustomers.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeCreateOrUpdateModal = this.closeCreateOrUpdateModal.bind(this);

        this.initializeState();

        this.pagingNavigation = new PagingNavigation.NavigationSetting({
            NavigationId: "Customer_Navigation",
            NumberPageRangeDisplay: this.numberPageRangeDisplay
        });
    }

    initializeState() {
        this.initialState = {
            SelectedIdOnRow: "",
            Request: {
                SearchTerm: "",
                SortName: "Name",
                PageIndex: 1,
                PageSize: this.pageSize,
                SortDirection: PagingModel.SortDirection.Asc
            },
            Response: {
                CurrentPage: 0,
                TotalRows: 0,
                TotalPages: 0,
                HasNext: false,
                HasPrevious: false,
                DTOs: new Array<ICustomer>()
            },
            Navigation: {
                FromPage: 1,
                ToPage: this.numberPageRangeDisplay
            }
        };
        this.state = this.initialState;
    }

    closeCreateOrUpdateModal() {
        this.setState({
            Title: "",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: false
        });
    }

    closeDeleteModal() {
        this.setState({
            Title: "",
            SelectedIdOnRow: "",
            IsOpenDeleteModal: false
        });
    }

    showCreateModal() {
        this.setState({
            Title: "Thêm mới",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: true
        });
    }

    showUpdateModal(customerId: string) {
        this.setState({
            Title: "Cập nhật",
            SelectedIdOnRow: customerId,
            IsOpenCreateOrUpdateModal: true
        });
    }

    showConfirmDeleteModal(customerId: string) {
        this.setState({
            Title: "Xóa khách hàng",
            SelectedIdOnRow: customerId,
            IsOpenDeleteModal: true
        });
    }

    ShowSpecifyCustomerCar(customerId: string) {
        this.props.SpecifyCustomerCar(customerId);
    }

    showPopoverLicensePlate(elementIdOrClass: string) {
        let options = {
            container: 'body',
            trigger: 'click',
            title: 'Biển số xe',
            content: () => this.currentLicensePlate
        }

        $(elementIdOrClass).popover(options);
    }

    onDeleteCustomer(event) {
        event.preventDefault();
        this.props.deleteCustomer({ customerId: this.state.SelectedIdOnRow });
        this.closeDeleteModal();
        this.onLoadCustomers();
    }

    onFilterCustomers() {
        this.state.Request.PageIndex = 1;
        this.onLoadCustomers();
    }

    onLoadCustomers() {
        Loading.showLoading(true, "customers-paging");
        this.props.loadPagingCustomers(this.state.Request);
    }

    componentDidMount() {
        this.onLoadCustomers();
    }

    componentDidUpdate() {
        this.showPopoverLicensePlate('.sorting_1');
    }

    componentWillReceiveProps(nextProps) {
        let deleteResult = nextProps.deleteResult.target;
        if (deleteResult != this.props.deleteResult.target) {
            if (deleteResult.Success) {
                this.initialState.Request.PageIndex = 1;
                this.setState(this.initialState);
                this.closeDeleteModal();
                this.onLoadCustomers();
            }
            else {
                if (deleteResult.Message) {
                    let dependentErrorMessage = deleteResult.Message[0].ErrorMessage;
                    ToastHelper.notificationError(dependentErrorMessage);
                    this.closeDeleteModal();
                }
            }
        }

        let specifyCustomerResult = nextProps.specifyCustomerResult.target;
        if (specifyCustomerResult.Success && specifyCustomerResult.Data) {
            this.currentLicensePlate = specifyCustomerResult.Data.Car.LicensePlates;
        }
    }

    setResponseState(dataResponse: any) {
        Loading.showLoading(false, "customers-paging");
        this.state.Response.CurrentPage = dataResponse.CurrentPage;
        this.state.Response.TotalRows = dataResponse.TotalRows;
        this.state.Response.TotalPages = dataResponse.TotalPages;
        this.state.Response.HasNext = dataResponse.HasNext;
        this.state.Response.HasPrevious = dataResponse.HasPrevious;
        this.state.Response.DTOs = dataResponse.DTOs;
    }

    showLoading() {
        return this.props.pagingResult.loading;
    }

    onSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.isSelectItemsPerPage = false;
        this.setState({
            Request: {
                SearchTerm: event.target.value,
                SortName: this.state.Request.SortName,
                SortDirection: this.state.Request.SortDirection,
                PageIndex: this.state.Request.PageIndex,
                PageSize: this.state.Request.PageSize
            },
            Response: this.state.Response,
            Navigation: this.state.Navigation
        });
    }

    onSelectItemsPerPage(numberOfItems: number) {
        this.state.Request.PageIndex = 1;
        this.state.Request.PageSize = numberOfItems;
        this.state.Navigation.FromPage = 1;
        this.onLoadCustomers();
        this.isSelectItemsPerPage = true;
    }

    showItemsPerPage() {
        return (
            <ItemsPerPage Id="Customer_ItemsPerPage"
                SelectedValue={this.state.Request.PageSize}
                onSelectItemsPerPage={(numberItemsSelected) => this.onSelectItemsPerPage(numberItemsSelected)} />
        );
    }

    onLoadCustomersByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
        this.pagingNavigation.setGroupPageIndexForNextNavigation<ICustomer>(this.state);
    }

    onLoadCustomersByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation<ICustomer>(this.state);
    }

    onLoadCustomersByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
    }

    showNavigationButtons() {
        let customersPagingResult = this.props.customersPagingResult.target;
        if (customersPagingResult.Success) {
            return this.pagingNavigation.showNavigationButtons<ICustomer>(this.state, this.isSelectItemsPerPage,
                () => this.onLoadCustomersByNextNavigation(),
                () => this.onLoadCustomersByPrevNavigation(),
                (pageIndex) => this.onLoadCustomersByPageSelected(pageIndex));
        }
    }

    onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadCustomers();
    }

    showSortStatus(sortName: string) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }

    renderCustomers() {
        let customersPagingResult = this.props.customersPagingResult.target;
        if (customersPagingResult.Success) {
            this.setResponseState(customersPagingResult.Data);

            let dtosResponse = customersPagingResult.Data.DTOs;
            return dtosResponse.length
                ? dtosResponse.map((customer, i) => { return this.renderCustomer(customer) })
                : <NoData ColSpan={7} />
        }
    }

    renderCustomer(item: ICustomer) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1" onMouseEnter={() => { this.ShowSpecifyCustomerCar(item.Id) }}>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Address}</td>
                {/* <td>{item.BranchName}</td>
                <td>{item.CustomerTypeName}</td> */}
                <td>{item.Phone}</td>
                <td>{item.Email}</td>
                <td className="text-center">
                    <a href="javascript:void(0);" onClick={() => { this.showUpdateModal(item.Id) }}>
                        <i className="fa fa-pencil text-navy" aria-hidden="true"></i>
                    </a>
                </td>
                <td className="text-center">
                    <a href="javascript:void(0);" onClick={() => { this.showConfirmDeleteModal(item.Id) }}>
                        <i className="fa fa-times text-navy" aria-hidden="true"></i>
                    </a>
                </td>
            </tr>
        );
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
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                        <Export tableId="DataTables_Table_0" tableName="customersTable" data={this.state.Response.DTOs} />

                                        {this.showItemsPerPage()}

                                        <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                            <label>
                                                <input type="search"
                                                    placeholder="Tìm kiếm"
                                                    className="form-control input-sm"
                                                    aria-controls="DataTables_Table_0"
                                                    value={this.state.Request.SearchTerm}
                                                    onChange={e => this.onSearchInput(e)} />
                                            </label>
                                            <button type="button" className="btn btn-w-m btn-primary"
                                                onClick={() => this.onFilterCustomers()}>Tìm</button>
                                        </div>

                                        <table id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid"
                                            className="table table-striped table-bordered table-hover dataTables-example dataTable">
                                            <thead>
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
                                            </thead>
                                            <tbody>
                                                {this.renderCustomers()}
                                            </tbody>
                                        </table>

                                        {this.showNavigationButtons()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <button type="button" onClick={() => this.showCreateModal()} className="btn btn-w-m btn-primary">Thêm mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenCreateOrUpdateModal} close={this.closeCreateOrUpdateModal}>
                    <CustomerForm customerId={this.state.SelectedIdOnRow} closeModal={this.closeCreateOrUpdateModal} reloadCustomers={this.onLoadCustomers.bind(this)} />
                </GeneralModal>

                <GeneralModal size={"small"} title={this.state.Title} isOpen={this.state.IsOpenDeleteModal} close={this.closeDeleteModal}>
                    <div className="text-center">
                        <div>{BaseComponent.DELETE_MESSAGE("khách hàng")}</div>
                        <br />
                        <button className="btn btn-primary" onClick={this.onDeleteCustomer.bind(this)} type="submit">OK</button>
                    </div>
                </GeneralModal>
                <ToastContainer autoClose={1500} />
            </React.Fragment>
        );
    }
}

const connectedComponent = new CustomerPagingMapping().connectComponent(CustomerPaging);
export { connectedComponent as CustomerPaging };
