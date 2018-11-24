import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "moment/locale/it";
import moment from "moment";
import MomentLocaleUtils, { formatDate, parseDate, } from "react-day-picker/moment";

import * as BaseComponent from "core/component/component";
import * as PagingModel from "core/component/model";
import * as PagingNavigation from "../../../../core/control/paging/index";
import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";

import * as Loading from "component/common/loading-icon/loader";
import { SortDirection } from "core/component/model";
import { Export } from "component/common/export-component";
import { ItemsPerPage } from "component/common/paging/items-perpage-component";
import { NoData } from "component/common/paging/nodata-component";
import { setStatusForCurrentQuotation } from "../../model/initialization";
import { QuotationStatus } from "../../model/quotation-info-model";
import { GeneralModal } from "component/common/modal-component";
import * as ToastHelper from "component/common/toast/toast";
enum SearchCondition {
    All = -1,
    QuotationId = 0,
    QuotationStatus = 1,
    CustomerId = 2,
    QuotationEntryDate = 3,
    LookupType = 4
}

interface IQuotationState extends PagingModel.IPaging<any> {
    SelectedFilterOption: number,
    SearchConditions: Array<any>
}

class LookupQuotations extends React.Component<any, IQuotationState> implements BaseComponent.IComponentState {

    private pageSize: number = 10;
    private numberPageRangeDisplay: number = 3;
    private isSelectItemsPerPage: boolean = false;
    private initialState: IQuotationState;
    private pagingNavigation: PagingNavigation.NavigationSetting<any>;

    constructor(props: any) {
        super(props);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onSetSelectedOption = this.onSetSelectedOption.bind(this);
        this.closeCreateOrUpdateModal = this.closeCreateOrUpdateModal.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);

        this.initializeState();

        this.pagingNavigation = new PagingNavigation.NavigationSetting(
            {
                NavigationId: "Quotation_Navigation",
                NumberPageRangeDisplay: this.numberPageRangeDisplay
            }
        );
    }

    initializeState() {
        this.initialState = {
            SelectedFilterOption: -1,
            SearchConditions: ["empty", "empty", "empty", "empty", "empty"],
            SelectedIdOnRow: "",
            Request: {
                SearchTerm: "",
                SortName: "Id",
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
                DTOs: new Array<any>()
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

    showUpdateModal(quotationId: string) {
        this.setState({
            Title: "Xác nhận hoàn tất báo giá",
            SelectedIdOnRow: quotationId,
            IsOpenCreateOrUpdateModal: true
        });
    }

    onFinishQuotation(event) {
        event.preventDefault();
        this.props.deleteQuotation({ statusId: QuotationStatus.Done, quotationId: this.state.SelectedIdOnRow });

        // this.setState({ SelectedIdOnRow: quotationId }, 
        // () => {
        //     this.props.deleteQuotation({statusId: QuotationStatus.Done, quotationId: this.state.SelectedIdOnRow });
        // });
    }

    componentWillReceiveProps(nextProps) {
        Loading.showLoading(nextProps.pagingResult.loading, "lookup-quotation");

        let pagingResult = nextProps.pagingResult.target;
        if (pagingResult != this.props.pagingResult.target && pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            this.closeCreateOrUpdateModal();
        }

        let deleteResult = nextProps.deleteResult.target;
        if (deleteResult != this.props.deleteResult.target && deleteResult.Success) {
            ToastHelper.notificationSuccess("Đã hoàn tất báo giá!");
            this.onLoadQuotations();
        }
    }

    setResponseState(dataResponse: any) {
        this.setState({
            Response: {
                CurrentPage: dataResponse.CurrentPage,
                TotalRows: dataResponse.TotalRows,
                TotalPages: dataResponse.TotalPages,
                HasNext: dataResponse.HasNext,
                HasPrevious: dataResponse.HasPrevious,
                DTOs: dataResponse.DTOs
            }
        })
    }

    componentDidMount() {
        this.onLoadQuotations();
    }

    onLoadQuotations() {
        this.state.Request.SortName = "StartDate";
        this.state.Request.SortDirection = "Descending";
        this.state.SearchConditions[SearchCondition.LookupType] = this.getLookupTypeTransformation();
        this.state.SearchConditions[this.state.SelectedFilterOption] = this.state.Request.SearchTerm;

        this.props.loadPagingQuotations({
            SearchCondition: this.state.SearchConditions.join(","),
            SortName: this.state.Request.SortName,
            SortDirection: this.state.Request.SortDirection,
            PageIndex: this.state.Request.PageIndex,
            PageSize: this.state.Request.PageSize
        });
    }

    getLookupTypeTransformation() {
        if (this.props.lookupType == "transaction-history")
            return "TransactionHistory";
        if (this.props.lookupType == "maintenance-expire")
            return "MaintenanceExpire";
        if (this.props.lookupType == "maitaining-service")
            return "MaitainingService";
    }

    onSelectItemsPerPage(numberOfItems: number) {
        this.state.Request.PageIndex = 1;
        this.state.Request.PageSize = numberOfItems;
        this.state.Navigation.FromPage = 1;
        this.onLoadQuotations();
        this.isSelectItemsPerPage = true;
    }

    showItemsPerPage() {
        return (
            <ItemsPerPage Id="Quotation_ItemsPerPage"
                SelectedValue={this.state.Request.PageSize}
                onSelectItemsPerPage={(numberSelected) => this.onSelectItemsPerPage(numberSelected)} />
        );
    }

    onLoadQuotationsByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadQuotations();
        this.pagingNavigation.setGroupPageIndexForNextNavigation<any>(this.state);
    }

    onLoadQuotationsByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadQuotations();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation<any>(this.state);
    }

    onLoadQuotationsByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadQuotations();
    }

    showNavigationButtons() {
        if (this.props.pagingResult && this.props.pagingResult.target && this.props.pagingResult.target.Success) {
            return this.pagingNavigation.showNavigationButtons<any>(this.state, this.isSelectItemsPerPage,
                () => this.onLoadQuotationsByNextNavigation(),
                () => this.onLoadQuotationsByPrevNavigation(),
                (pageIndex) => this.onLoadQuotationsByPageSelected(pageIndex));
        }
    }

    onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadQuotations();
    }

    showSortStatus(sortName: string) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }

    renderQuotations() {
        return (
            this.state.Response.DTOs.length ?
                this.state.Response.DTOs.map((quotation, i) => { return this.renderQuotation(quotation) }) : <NoData ColSpan={9} />
        )
    }

    renderQuotation(item: any) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id} style={this.setColorByQuotationStatus(item.StatusId)}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.EntryDate}</td>
                <td>{item.CompleteDate}</td>
                <td>
                    {item.CustomerName}
                    <input type="hidden" value={item.CustomerId} />
                </td>
                <td>{item.Customer.Phone}</td>
                {/* <td>
                    {item.Car != null ? item.Car.Name : ""}
                    <input type="hidden" value={item.Car != null ? item.Car.Id : ""} />
                </td> */}
                <td>{item.Car != null ? item.Car.LicensePlates : ""}</td>
                <td>
                    {setStatusForCurrentQuotation(item.StatusName)}
                </td>
                {this.renderFinishQuotationIcon(item)}
            </tr>
        );
    }

    renderFinishQuotationIcon(item) {
        if (this.props.lookupType == "maitaining-service")
            return <td className="text-center">
                <a href="javascript:void(0);" title="Hoàn tất báo giá"
                    onClick={() => { this.showUpdateModal(item.Id) }}>
                    <i className="fa fa-check text-navy" aria-hidden="true"></i>
                </a>
            </td>
    }

    setColorByQuotationStatus(statusId: number) {
        if (statusId == QuotationStatus.Complete)
            return { backgroundColor: "#cddde9" };
        if (statusId == QuotationStatus.CheckUp)
            return { backgroundColor: "#dceddc" };
        if (statusId == QuotationStatus.Cancel)
            return { backgroundColor: "#f7e1e1" };
        return {};
    }

    goToSpecifyReceipts(receiptId: number, quotationId: string) {
        window.location.href = `/#/admin/receipts-bill/${receiptId}/${quotationId}`;
    }

    onSetSelectedOption(event: any) {
        this.setState({ SelectedFilterOption: event.target.value });
    }

    renderSearchOptions() {
        return (
            <select className="form-control" name="search-option" onChange={(e) => this.onSetSelectedOption(e)}>
                <option value={SearchCondition.All}>Tất cả</option>
                <option value={SearchCondition.QuotationId}>Mã báo giá</option>
                <option value={SearchCondition.QuotationStatus}>Trạng thái báo giá</option>
                <option value={SearchCondition.CustomerId}>Mã khách hàng</option>
                <option value={SearchCondition.QuotationEntryDate}>Ngày nhập</option>
            </select>
        )
    }

    setRequestFilter(filterValue) {
        this.isSelectItemsPerPage = false;
        this.setState({
            Request: {
                SearchTerm: filterValue,
                SortName: this.state.Request.SortName,
                SortDirection: this.state.Request.SortDirection,
                PageIndex: this.state.Request.PageIndex,
                PageSize: this.state.Request.PageSize
            }
        });
    }

    onSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setRequestFilter(event.target.value);
    }

    onSelectQuotationStatus(event: any) {
        this.setRequestFilter(event.target.value);
    }

    onInputEntryDate(daySelected: Date) {
        let entryDate: any = moment(daySelected).format("DD/MM/YYYY");
        this.setRequestFilter(entryDate);
    }

    renderSearchTerm() {
        if (this.state.SelectedFilterOption == SearchCondition.QuotationStatus && this.props.lookupType != "transaction-history") {
            return (
                <select className="form-control mr-2" name="quotation-status" onChange={(e) => this.onSelectQuotationStatus(e)}>
                    <option value={QuotationStatus.RequestFromCustomer}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.RequestFromCustomer])}</option>
                    <option value={QuotationStatus.Quotation}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.Quotation])}</option>
                    <option value={QuotationStatus.RepairCommand}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.RepairCommand])}</option>
                    <option value={QuotationStatus.ExportMaterial}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.ExportMaterial])}</option>
                    <option value={QuotationStatus.Complete}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.Complete])}</option>
                    <option value={QuotationStatus.CheckUp}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.CheckUp])}</option>
                    <option value={QuotationStatus.Cancel}>{setStatusForCurrentQuotation(QuotationStatus[QuotationStatus.Cancel])}</option>
                </select>
            );
        }
        else if (this.state.SelectedFilterOption == SearchCondition.QuotationEntryDate && this.props.lookupType != "maintenance-expire") {
            return (
                <DayPickerInput name="EntryDateSearchTerm" className="form-control mr-2" data-fieldset="Quotation"
                    value={this.state.Request.SearchTerm} onDayChange={this.onInputEntryDate.bind(this)}
                    formatDate={formatDate} parseDate={parseDate}
                    dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} />
            );
        }
        else {
            return (
                <input type="search" placeholder="Tìm kiếm"
                    className="form-control input-sm" aria-controls="DataTables_Table_0"
                    value={this.state.Request.SearchTerm} onChange={e => this.onSearchInput(e)} />
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Danh sách báo giá</h5>
                            </div>

                            <div className="ibox-content" id="lookup-quotation">
                                <Loading.loadingIcon container="lookup-quotation" />

                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                        {/* <Export tableId="DataTables_Table_0" tableName="quotationsTable" /> */}
                                        {this.showItemsPerPage()}

                                        <div id="DataTables_Table_0_filter" style={{ float: "right" }} className="dataTables_filter">
                                            <label>
                                                {this.renderSearchOptions()}
                                                {this.renderSearchTerm()}
                                            </label>
                                            <button type="button" className="btn btn-w-m btn-primary"
                                                onClick={() => this.onLoadQuotations()}>Tìm</button>
                                        </div>

                                        <table id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid"
                                            className="table table-bordered table-hover dataTables-example dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th className={this.showSortStatus("Id")}
                                                        onClick={() => this.onSorting("Id")}>Mã báo giá</th>
                                                    <th className={this.showSortStatus("EntryDate")}
                                                        onClick={() => this.onSorting("EntryDate")}>Ngày vào</th>
                                                    <th className={this.showSortStatus("CompleteDate")}
                                                        onClick={() => this.onSorting("CompleteDate")}>Ngày hoàn thành</th>
                                                    <th>Tên khách hàng</th>
                                                    <th>Điện thoại</th>
                                                    {/* <th>Tên xe</th> */}
                                                    <th>Biển số xe</th>
                                                    <th className={this.showSortStatus("StatusId")}
                                                        onClick={() => this.onSorting("StatusId")}>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderQuotations()}
                                            </tbody>
                                        </table>

                                        {this.showNavigationButtons()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <GeneralModal size={"small"} title={this.state.Title} isOpen={this.state.IsOpenCreateOrUpdateModal} close={this.closeCreateOrUpdateModal}>
                    <div className="text-center">
                        <div>{"Bạn có muốn hoàn tất báo giá này"}</div>
                        <br />
                        <button className="btn btn-primary" onClick={this.onFinishQuotation.bind(this)} type="submit">OK</button>
                    </div>
                </GeneralModal>

                <ToastContainer autoClose={1500} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        lookupType: ownProps.match.params.lookupType,
        pagingResult: state.QuotationsPagingReducer,
        deleteResult: state.QuotationChangeStatusReducer
    };
}

function mapDispatchToProps(dispatch: any) {
    let pagingAction = new FetchAction.QuotationsPagingAction();
    let deleteAction = new PostAction.QuotationChangeStatusAction();

    return {
        loadPagingQuotations: (entry: any) => dispatch(pagingAction.fetch(entry)),
        deleteQuotation: (entry: any) => dispatch(deleteAction.post(entry))
    }
}

const connectedQuotations = connect(mapStateToProps, mapDispatchToProps)(LookupQuotations);
export { connectedQuotations as LookupQuotations };
