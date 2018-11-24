import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";
import * as BaseComponent from "../../../../core/component";
import * as PagingNavigation from "../../../../core/control/paging/index";
import * as PagingModel from "../../../../component/common/paging/model";
import { SortDirection } from "../../../../component/common/paging/model";
import { Export } from "../../../../component/common/export";
import { GeneralModal } from "../../../../../app/component/control/popup/modal";
import { ServiceTypeForm } from "./service-type-form";
import { NoData } from "../../../../component/common/paging/index";
class ServiceTypes extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.numberPageRangeDisplay = 3;
        this.isSelectItemsPerPage = false;
        this.afterSelectItemsPerPageLoaded = false;
        this.closeCreateOrUpdateModal = this.closeCreateOrUpdateModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.initializeState();
        this.pagingNavigation = new PagingNavigation.NavigationSetting({
            NavigationId: "ServiceType_Navigation",
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
            Title: "Thêm mới loại dịch vụ",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: true
        });
    }
    showUpdateModal(serviceTypeId) {
        this.setState({
            Title: "Cập nhật loại dịch vụ",
            SelectedIdOnRow: serviceTypeId,
            IsOpenCreateOrUpdateModal: true
        });
    }
    showConfirmDeleteModal(serviceTypeId) {
        this.setState({
            Title: "Xóa loại dịch vụ",
            SelectedIdOnRow: serviceTypeId,
            IsOpenDeleteModal: true
        });
    }
    onDeleteServiceType(event) {
        event.preventDefault();
        this.props.deleteServiceType({ serviceTypeId: this.state.SelectedIdOnRow });
    }
    componentDidMount() {
        this.onLoadServiceType();
    }
    onLoadServiceType() {
        this.props.loadPagingServiceType(this.state.Request);
    }
    setResponseState(dataResponse) {
        this.state.Response.CurrentPage = dataResponse.CurrentPage;
        this.state.Response.TotalRows = dataResponse.TotalRows;
        this.state.Response.TotalPages = dataResponse.TotalPages;
        this.state.Response.HasNext = dataResponse.HasNext;
        this.state.Response.HasPrevious = dataResponse.HasPrevious;
        this.state.Response.DTOs = dataResponse.DTOs;
    }
    fetchServiceTypes() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            let dtosResponse = pagingResult.Data.DTOs;
            return (dtosResponse.length ?
                dtosResponse.map((serviceType, i) => { return this.fetchServiceType(serviceType); }) : React.createElement(NoData, null));
        }
    }
    fetchServiceType(item) {
        return (React.createElement("tr", { className: "gradeA odd", role: "row", key: item.Id },
            React.createElement("td", { className: "sorting_1" }, item.Id),
            React.createElement("td", null, item.Name),
            React.createElement("td", null, item.Description),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascript:void(0);", onClick: () => { this.showUpdateModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-pencil text-navy", "aria-hidden": "true" }))),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascript:void(0);", onClick: () => { this.showConfirmDeleteModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-times text-navy", "aria-hidden": "true" })))));
    }
    onSorting(sortingName) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
            ? SortDirection.Desc : SortDirection.Asc;
    }
    showSortStatus(sortName) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }
    onLoadServiceTypeByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadServiceType();
        this.pagingNavigation.setGroupPageIndexForNextNavigation(this.state);
    }
    onLoadServiceTypeByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadServiceType();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation(this.state);
    }
    onLoadServiceTypeByPageSelected(pageIndex) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadServiceType();
    }
    showNavigationButtons() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            return this.pagingNavigation.showNavigationButtons(this.state, this.isSelectItemsPerPage, () => this.onLoadServiceTypeByNextNavigation(), () => this.onLoadServiceTypeByPrevNavigation(), (pageIndex) => this.onLoadServiceTypeByPageSelected(pageIndex));
        }
    }
    render() {
        return (React.createElement(Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12" },
                    React.createElement("div", { className: "ibox float-e-margins" },
                        React.createElement("div", { className: "ibox-title" },
                            React.createElement("h5", null, "Danh s\u00E1ch d\u1ECBch v\u1EE5")),
                        React.createElement("div", { className: "ibox-content" },
                            React.createElement("div", { className: "table-responsive" },
                                React.createElement("div", { id: "DataTables_Table_0_wrapper", className: "dataTables_wrapper form-inline dt-bootstrap" },
                                    React.createElement(Export, null),
                                    React.createElement("div", { id: "DataTables_Table_0_filter", style: { float: "right" }, className: "dataTables_filter" },
                                        React.createElement("label", null,
                                            "Nh\u1EADp t\u1EEB kh\u00F3a:",
                                            React.createElement("input", { type: "search", placeholder: "Tìm kiếm", className: "form-control input-sm", "aria-controls": "DataTables_Table_0" })),
                                        React.createElement("button", { type: "button", className: "btn btn-w-m btn-primary" }, "T\u00ECm")),
                                    React.createElement("table", { id: "DataTables_Table_0", "aria-describedby": "DataTables_Table_0_info", role: "grid", className: "table table-striped table-bordered table-hover dataTables-example dataTable" },
                                        React.createElement("thead", null,
                                            React.createElement("tr", { role: "row" },
                                                React.createElement("th", { className: this.showSortStatus("Id"), onClick: () => this.onSorting("Id") }, "M\u00E3 d\u1ECBch v\u1EE5"),
                                                React.createElement("th", { className: this.showSortStatus("Name"), onClick: () => this.onSorting("Name") }, "T\u00EAn d\u1ECBch v\u1EE5"),
                                                React.createElement("th", { className: this.showSortStatus("Description"), onClick: () => this.onSorting("Description") }, "M\u00F4 t\u1EA3"),
                                                React.createElement("th", { colSpan: 2 }))),
                                        React.createElement("tbody", null, this.fetchServiceTypes())),
                                    this.showNavigationButtons())),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-lg-12 text-right" },
                                    React.createElement("button", { type: "button", onClick: () => { this.showCreateModal(); }, className: "btn btn-w-m btn-primary" }, "Th\u00EAm m\u1EDBi"))))))),
            React.createElement(GeneralModal, { size: "lg", title: this.state.Title, isOpen: this.state.IsOpenCreateOrUpdateModal, close: this.closeCreateOrUpdateModal },
                React.createElement(ServiceTypeForm, { serviceTypeId: this.state.SelectedIdOnRow, close: this.closeCreateOrUpdateModal })),
            React.createElement(GeneralModal, { size: "lg", title: this.state.Title, isOpen: this.state.IsOpenDeleteModal, close: this.closeDeleteModal },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", null, BaseComponent.DELETE_MESSAGE("loại dịch vụ")),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn btn-primary", onClick: this.onDeleteServiceType.bind(this), type: "submit" }, "OK")))));
    }
}
function mapStateToProps(state) {
    return {
        pagingResult: state.ServiceTypeWithPagingReducer
    };
}
function mapDispatchToProps(dispatch) {
    let pagingAction = new FetchAction.ServiceTypePagingAction();
    let deleteAction = new PostAction.ServiceTypeDeleteAction();
    return {
        loadPagingServiceType: (entry) => dispatch(pagingAction.listServiceTypeWithPaging(entry)),
        deleteServiceType: (entry) => dispatch(deleteAction.deleteServiceType(entry))
    };
}
const connectedServiceType = connect(mapStateToProps, mapDispatchToProps)(ServiceTypes);
export { connectedServiceType as ServiceTypes };
//# sourceMappingURL=service-type-paging.js.map