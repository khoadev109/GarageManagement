import React from "react";
import { connect } from "react-redux";
import * as BaseComponent from "../../../../core/component";
import * as PagingModel from "../../../../component/common/paging/model";
import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";
import { SortDirection } from "../../../../component/common/paging/model";
import { Export } from "../../../../component/common/export";
import { Navigation } from "../../../../component/common/paging/navigation";
import { ItemsPerPage } from "../../../../component/common/paging/items-per-page";
import { GeneralModal } from "../../../../../app/component/control/popup/modal";
import { CarForm } from "./car-form";
class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.numberPageRangeDisplay = 3;
        this.isDeleteSuccesfully = false;
        this.isSelectItemsPerPage = false;
        this.afterSelectItemsPerPageLoaded = false;
        this.onSearchInput = this.onSearchInput.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeCreateOrUpdateModal = this.closeCreateOrUpdateModal.bind(this);
        this.initializeState();
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
            Title: "Thêm mới xe",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: true
        });
    }
    showUpdateModal(carId) {
        this.setState({
            Title: "Cập nhật xe",
            SelectedIdOnRow: carId,
            IsOpenCreateOrUpdateModal: true
        });
    }
    showConfirmDeleteModal(carId) {
        this.setState({
            Title: "Xóa xe",
            SelectedIdOnRow: carId,
            IsOpenDeleteModal: true
        });
    }
    onDeleteCar(event) {
        event.preventDefault();
        this.props.deleteCar({ carId: this.state.SelectedIdOnRow });
    }
    componentWillReceiveProps(nextProps) {
        let deleteResult = nextProps.deleteResult.target;
        if (!this.isDeleteSuccesfully && deleteResult.Success && deleteResult.Data) {
            this.isDeleteSuccesfully = true;
            this.initialState.IsOpenDeleteModal = false;
            this.initialState.Request.PageIndex = 1;
            this.setState(this.initialState);
            this.onLoadCars();
        }
    }
    componentDidMount() {
        this.onLoadCars();
    }
    onLoadCars() {
        this.props.loadPagingCars(this.state.Request);
    }
    fetchCars() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            let dtosResponse = pagingResult.Data.DTOs;
            return (dtosResponse.length ?
                dtosResponse.map((car, i) => { return this.fetchCar(car); }) : null);
        }
    }
    fetchCar(item) {
        return (React.createElement("tr", { className: "gradeA odd", role: "row", key: item.Id },
            React.createElement("td", { className: "sorting_1" }, item.Id),
            React.createElement("td", null, item.Name),
            React.createElement("td", null, item.Color),
            React.createElement("td", null, item.LicensePlates),
            React.createElement("td", null, item.Vinnumber),
            React.createElement("td", null, item.Km),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascrip:", onClick: () => { this.showUpdateModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-pencil text-navy", "aria-hidden": "true" }))),
            React.createElement("td", { className: "text-center" },
                React.createElement("a", { href: "javascrip:", onClick: () => { this.showConfirmDeleteModal(item.Id); } },
                    React.createElement("i", { className: "fa fa-times text-navy", "aria-hidden": "true" })))));
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
        this.onLoadCars();
        this.isSelectItemsPerPage = true;
    }
    showItemsPerPage() {
        return (React.createElement(ItemsPerPage, { Id: "Car_ItemsPerPage", SelectedValue: this.state.Request.PageSize, onSelectItemsPerPage: (numberSelected) => this.onSelectItemsPerPage(numberSelected) }));
    }
    onLoadCarsByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCars();
        this.setGroupPageIndexForNextNavigation();
    }
    onLoadCarsByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadCars();
        this.setGroupPageIndexForPrevNavigation();
    }
    onLoadCarsByPageSelected(pageIndex) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadCars();
    }
    showNavigationButtons() {
        if (this.isSelectItemsPerPage) {
            if (this.numberPageRangeDisplay < this.state.Response.TotalPages)
                this.state.Navigation.ToPage = this.numberPageRangeDisplay;
            else
                this.state.Navigation.ToPage = this.state.Response.TotalPages;
        }
        return (React.createElement(Navigation, { Id: "Car_Navigation", CurrentPage: this.state.Response.CurrentPage, HasNext: this.state.Response.HasNext, HasPrevious: this.state.Response.HasPrevious, PageRange: this.state.Navigation, onLoadByNextNavigation: () => this.onLoadCarsByNextNavigation(), onLoadByPrevNavigation: () => this.onLoadCarsByPrevNavigation(), onLoadByPageSelectedNavigation: (pageIndex) => this.onLoadCarsByPageSelected(pageIndex) }));
    }
    setGroupPageIndexForNextNavigation() {
        if (this.state.Response.TotalPages % this.numberPageRangeDisplay == 0) {
            let groupNavigationSize = Math.floor(this.state.Response.TotalPages / this.numberPageRangeDisplay);
            for (let index = 1; index <= groupNavigationSize; index++) {
                let toPageRange = index * this.numberPageRangeDisplay + index - 1;
                if (this.state.Request.PageIndex > toPageRange &&
                    this.state.Navigation.ToPage < this.state.Response.TotalPages) {
                    this.state.Navigation.FromPage = this.state.Request.PageIndex;
                    this.state.Navigation.ToPage = this.state.Request.PageIndex + this.numberPageRangeDisplay - 1;
                }
            }
        }
        else {
            if (this.state.Request.PageIndex > this.numberPageRangeDisplay) {
                this.state.Navigation.FromPage = this.state.Request.PageIndex - (this.numberPageRangeDisplay - 1);
                this.state.Navigation.ToPage = this.state.Request.PageIndex;
            }
        }
    }
    setGroupPageIndexForPrevNavigation() {
        let groupNavigationSize = Math.ceil(this.state.Response.TotalPages / this.numberPageRangeDisplay);
        for (let index = 1; index <= groupNavigationSize; index++) {
            let standingIndex = index - 1;
            let fromPageRange = standingIndex * this.numberPageRangeDisplay + standingIndex;
            if (this.state.Request.PageIndex < fromPageRange) {
                this.state.Navigation.FromPage = this.state.Request.PageIndex;
                this.state.Navigation.ToPage = this.state.Request.PageIndex + this.numberPageRangeDisplay - 1;
            }
        }
    }
    onSorting(sortingName) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadCars();
    }
    showSortStatus(sortName) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
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
                                        React.createElement("button", { type: "button", className: "btn btn-w-m btn-primary", onClick: () => this.onLoadCars() }, "T\u00ECm")),
                                    this.showItemsPerPage(),
                                    React.createElement("table", { id: "DataTables_Table_0", "aria-describedby": "DataTables_Table_0_info", role: "grid", className: "table table-striped table-bordered table-hover dataTables-example dataTable" },
                                        React.createElement("thead", null,
                                            React.createElement("tr", { role: "row" },
                                                React.createElement("th", { className: this.showSortStatus("Id"), onClick: () => this.onSorting("Id") }, "M\u00E3 xe"),
                                                React.createElement("th", { className: this.showSortStatus("Name"), onClick: () => this.onSorting("Name") }, "T\u00EAn xe"),
                                                React.createElement("th", { className: this.showSortStatus("Color"), onClick: () => this.onSorting("Color") }, "M\u00E0u s\u1EAFc"),
                                                React.createElement("th", { className: this.showSortStatus("LicensePlates"), onClick: () => this.onSorting("LicensePlates") }, "Bi\u1EC3n s\u1ED1 xe"),
                                                React.createElement("th", { className: this.showSortStatus("Vinnumber"), onClick: () => this.onSorting("Vinnumber") }, "S\u1ED1 Vin"),
                                                React.createElement("th", { className: this.showSortStatus("Km"), onClick: () => this.onSorting("Km") }, "Km"),
                                                React.createElement("th", { colSpan: 2 }))),
                                        React.createElement("tbody", null, this.fetchCars())),
                                    this.showNavigationButtons())),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-lg-12 text-right" },
                                    React.createElement("button", { type: "button", onClick: () => { this.showCreateModal(); }, className: "btn btn-w-m btn-primary" }, "Th\u00EAm m\u1EDBi"))))))),
            React.createElement(GeneralModal, { size: "large", title: this.state.Title, isOpen: this.state.IsOpenCreateOrUpdateModal, close: this.closeCreateOrUpdateModal },
                React.createElement(CarForm, { carId: this.state.SelectedIdOnRow })),
            React.createElement(GeneralModal, { size: "lg", title: this.state.Title, isOpen: this.state.IsOpenDeleteModal, close: this.closeDeleteModal },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", null, BaseComponent.DELETE_MESSAGE("xe")),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn btn-primary", onClick: this.onDeleteCar.bind(this), type: "submit" }, "OK")))));
    }
}
function mapStateToProps(state) {
    return {
        deleteResult: state.CarDeleteReducer,
        pagingResult: state.CarsWithPagingReducer
    };
}
function mapDispatchToProps(dispatch) {
    let pagingAction = new FetchAction.CarsPagingAction();
    let deleteAction = new PostAction.CarDeleteAction();
    return {
        loadPagingCars: (entry) => dispatch(pagingAction.listCarsWithPaging(entry)),
        deleteCar: (entry) => dispatch(deleteAction.deleteCar(entry))
    };
}
const connectedCars = connect(mapStateToProps, mapDispatchToProps)(Customers);
export { connectedCars as Customers };
//# sourceMappingURL=cars-paging.js.map