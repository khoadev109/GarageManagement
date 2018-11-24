import React from "react";
import { connect } from "react-redux";
import * as BaseComponent from "../../../../core/component";
import * as PagingModel from "../../../../component/common/paging/model";
import * as PagingNavigation from "../../../../core/control/paging/index";
import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";
import { SortDirection } from "../../../../component/common/paging/model";
import { Export } from "../../../../component/common/export";
import { ItemsPerPage } from "../../../../component/common/paging/items-per-page";
import { NoData } from "../../../../component/common/paging/index";
import { GeneralModal } from "../../../../../app/component/control/popup/modal";
import { CustomerForm } from "./customer-form";
class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.numberPageRangeDisplay = 3;
        this.isSelectItemsPerPage = false;
        this.afterSelectItemsPerPageLoaded = false;
        this.onSearchInput = this.onSearchInput.bind(this);
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
                DTOs: new Array()
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
            Title: "Thêm mới khách hàng",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: true
        });
    }
    showUpdateModal(customerId) {
        this.setState({
            Title: "Cập nhật khách hàng",
            SelectedIdOnRow: customerId,
            IsOpenCreateOrUpdateModal: true
        });
    }
    showConfirmDeleteModal(customerId) {
        this.setState({
            Title: "Xóa khách hàng",
            SelectedIdOnRow: customerId,
            IsOpenDeleteModal: true
        });
    }
    onDeleteCustomer(event) {
        event.preventDefault();
        this.props.deleteCustomer({ customerId: this.state.SelectedIdOnRow });
    }
    componentWillReceiveProps(nextProps) {
        let deleteResult = nextProps.deleteResult.target;
        if (deleteResult.Success && deleteResult.Data) {
            this.initialState.IsOpenDeleteModal = false;
            this.initialState.Request.PageIndex = 1;
            this.setState(this.initialState);
            this.onLoadCustomers();
        }
    }
    componentDidMount() {
        this.onLoadCustomers();
    }
    onLoadCustomers() {
        this.props.loadPagingCustomers(this.state.Request);
    }
    setResponseState(dataResponse) {
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
    onSearchInput(event) {
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
    onSelectItemsPerPage(numberOfItems) {
        this.state.Request.PageIndex = 1;
        this.state.Request.PageSize = numberOfItems;
        this.state.Navigation.FromPage = 1;
        this.onLoadCustomers();
        this.isSelectItemsPerPage = true;
    }
    showItemsPerPage() {
        return (React.createElement(ItemsPerPage, { Id: "Customer_ItemsPerPage", SelectedValue: this.state.Request.PageSize, onSelectItemsPerPage: (numberSelected) => this.onSelectItemsPerPage(numberSelected) }));
    }
    onLoadCustomersByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
        this.pagingNavigation.setGroupPageIndexForNextNavigation(this.state);
    }
    onLoadCustomersByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation(this.state);
    }
    onLoadCustomersByPageSelected(pageIndex) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadCustomers();
    }
    showNavigationButtons() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            return this.pagingNavigation.showNavigationButtons(this.state, this.isSelectItemsPerPage, () => this.onLoadCustomersByNextNavigation(), () => this.onLoadCustomersByPrevNavigation(), (pageIndex) => this.onLoadCustomersByPageSelected(pageIndex));
        }
    }
    onSorting(sortingName) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadCustomers();
    }
    showSortStatus(sortName) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }
    fetchCustomers() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            let dtosResponse = pagingResult.Data.DTOs;
            return (dtosResponse.length ?
                dtosResponse.map((customer, i) => { return this.fetchCustomer(customer); }) : React.createElement(NoData, null));
        }
    }
    fetchCustomer(item) {
        return (React.createElement("tr", { className: "gradeA odd", role: "row", key: item.Id },
            React.createElement("td", { className: "sorting_1" }, item.Id),
            React.createElement("td", null, item.Name),
            React.createElement("td", null, item.Address),
            React.createElement("td", null, item.Phone),
            React.createElement("td", null, item.Email),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascript:void(0);", onClick: () => { this.showUpdateModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-pencil text-navy", "aria-hidden": "true" }))),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascript:void(0);", onClick: () => { this.showConfirmDeleteModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-times text-navy", "aria-hidden": "true" })))));
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12" },
                    React.createElement("div", { className: "ibox float-e-margins" },
                        React.createElement("div", { className: "ibox-title" },
                            React.createElement("h5", null, "Danh s\u00E1ch kh\u00E1ch h\u00E0ng")),
                        React.createElement("div", { className: "ibox-content" },
                            React.createElement("div", { className: "table-responsive" },
                                React.createElement("div", { id: "DataTables_Table_0_wrapper", className: "dataTables_wrapper form-inline dt-bootstrap" },
                                    React.createElement(Export, null),
                                    React.createElement("div", { id: "DataTables_Table_0_filter", style: { float: "right" }, className: "dataTables_filter" },
                                        React.createElement("label", null,
                                            "Nh\u1EADp t\u1EEB kh\u00F3a:",
                                            React.createElement("input", { type: "search", placeholder: "Tìm kiếm", className: "form-control input-sm", "aria-controls": "DataTables_Table_0", value: this.state.Request.SearchTerm, onChange: e => this.onSearchInput(e) })),
                                        React.createElement("button", { type: "button", className: "btn btn-w-m btn-primary", onClick: () => this.onLoadCustomers() }, "T\u00ECm")),
                                    this.showItemsPerPage(),
                                    React.createElement("table", { id: "DataTables_Table_0", "aria-describedby": "DataTables_Table_0_info", role: "grid", className: "table table-striped table-bordered table-hover dataTables-example dataTable" },
                                        React.createElement("thead", null,
                                            React.createElement("tr", { role: "row" },
                                                React.createElement("th", { className: this.showSortStatus("Id"), onClick: () => this.onSorting("Id") }, "M\u00E3 kh\u00E1ch h\u00E0ng"),
                                                React.createElement("th", { className: this.showSortStatus("Name"), onClick: () => this.onSorting("Name") }, "H\u1ECD t\u00EAn"),
                                                React.createElement("th", { className: this.showSortStatus("Address"), onClick: () => this.onSorting("Address") }, "\u0110\u1ECBa ch\u1EC9"),
                                                React.createElement("th", { className: this.showSortStatus("Phone"), onClick: () => this.onSorting("Phone") }, "\u0110i\u1EC7n tho\u1EA1i"),
                                                React.createElement("th", { className: this.showSortStatus("Email"), onClick: () => this.onSorting("Email") }, "Email"),
                                                React.createElement("th", { colSpan: 2 }))),
                                        React.createElement("tbody", null, this.fetchCustomers())),
                                    this.showNavigationButtons())),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-lg-12 text-right" },
                                    React.createElement("button", { type: "button", onClick: () => { this.showCreateModal(); }, className: "btn btn-w-m btn-primary" }, "Th\u00EAm m\u1EDBi"))))))),
            React.createElement(GeneralModal, { size: "large", title: this.state.Title, isOpen: this.state.IsOpenCreateOrUpdateModal, close: this.closeCreateOrUpdateModal },
                React.createElement(CustomerForm, { customerId: this.state.SelectedIdOnRow })),
            React.createElement(GeneralModal, { size: "lg", title: this.state.Title, isOpen: this.state.IsOpenDeleteModal, close: this.closeDeleteModal },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", null, BaseComponent.DELETE_MESSAGE("khách hàng")),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn btn-primary", onClick: this.onDeleteCustomer.bind(this), type: "submit" }, "OK")))));
    }
}
function mapStateToProps(state) {
    return {
        deleteResult: state.CustomerDeleteReducer,
        pagingResult: state.CustomersWithPagingReducer
    };
}
function mapDispatchToProps(dispatch) {
    let pagingAction = new FetchAction.CustomersPagingAction();
    let deleteAction = new PostAction.CustomerDeleteAction();
    return {
        loadPagingCustomers: (entry) => dispatch(pagingAction.listCustomersWithPaging(entry)),
        deleteCustomer: (entry) => dispatch(deleteAction.deleteCustomer(entry))
    };
}
const connectedCustomers = connect(mapStateToProps, mapDispatchToProps)(Customers);
export { connectedCustomers as Customers };
//# sourceMappingURL=customers-paging.js.map