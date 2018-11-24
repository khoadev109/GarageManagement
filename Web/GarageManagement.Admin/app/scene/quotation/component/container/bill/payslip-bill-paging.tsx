import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import * as BaseComponent from "core/component/component";
import * as PagingModel from "core/component/model";
import * as PagingNavigation from "../../../../../core/control/paging/index";
import * as FetchAction from "../../../action/fetch-action";
import { IPaySlip } from "../../../model/bill-model";
import { SortDirection } from "core/component/model";
import { Export } from "component/common/export-component";
import { ItemsPerPage } from "component/common/paging/items-perpage-component";
import { NoData } from "component/common/paging/nodata-component";

interface IPaySlipBillsState extends PagingModel.IPaging<IPaySlip> { }

class PaySlipBills extends React.Component<any, IPaySlipBillsState> implements BaseComponent.IComponentState {
    private pageSize: number = 10;
    private numberPageRangeDisplay: number = 3;
    private isSelectItemsPerPage: boolean = false;
    private initialState: PagingModel.IPaging<IPaySlip>;
    private pagingNavigation: PagingNavigation.NavigationSetting<IPaySlip>;

    constructor(props: any) {
        super(props);

        this.onSearchInput = this.onSearchInput.bind(this);
        this.onLoadPaySlips = this.onLoadPaySlips.bind(this);
        
        this.initializeState();

        this.pagingNavigation = new PagingNavigation.NavigationSetting(
            {
                NavigationId: "PaySlip_Bills_Navigation",
                NumberPageRangeDisplay: this.numberPageRangeDisplay
            }
        );
    }

    initializeState() {
        this.initialState = {
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
                DTOs: new Array<IPaySlip>()
            },
            Navigation: {
                FromPage: 1,
                ToPage: this.numberPageRangeDisplay
            }
        };
        this.state = this.initialState;
    }

    componentWillReceiveProps(nextProps) {
        
    }

    componentDidMount() {
        this.onLoadPaySlips();
    }

    onLoadPaySlips() {
        this.props.loadPagingPaySlips(this.state.Request);
    }

    setResponseState(dataResponse: any) {
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
        this.onLoadPaySlips();
        this.isSelectItemsPerPage = true;
    }

    showItemsPerPage() {
        return (
            <ItemsPerPage Id="PaySlip_Bills_ItemsPerPage"
                SelectedValue={this.state.Request.PageSize}
                onSelectItemsPerPage={(numberSelected) => this.onSelectItemsPerPage(numberSelected)} />
        );
    }

    onLoadReceiptsByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadPaySlips();
        this.pagingNavigation.setGroupPageIndexForNextNavigation<IPaySlip>(this.state);
    }

    onLoadReceiptsByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadPaySlips();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation<IPaySlip>(this.state);
    }

    onLoadReceiptsByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadPaySlips();
    }

    showNavigationButtons() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            return this.pagingNavigation.showNavigationButtons<IPaySlip>(this.state, this.isSelectItemsPerPage, 
                                                                         () => this.onLoadReceiptsByNextNavigation(),
                                                                         () => this.onLoadReceiptsByPrevNavigation(),
                                                                         (pageIndex) => this.onLoadReceiptsByPageSelected(pageIndex));
        }
    }

    onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
                                            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadPaySlips();
    }

    showSortStatus(sortName: string) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }

    fetchPaySlips() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            let dtosResponse = pagingResult.Data.DTOs;
            return (
                dtosResponse.length ?
                dtosResponse.map((receipt, i) => { return this.fetchPaySlip(receipt) }) 
                                                    : <NoData ColSpan={7} />
            )
        }
    }
    
    fetchPaySlip(item: IPaySlip) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.QuotationId ? item.QuotationId : ""}</td>
                <td>{item.Id}</td>
                <td>{item.Money}</td>
                <td>{item.Receiver}</td>
                <td>{item.CreateDate}</td>
                <td>{item.ModifiedDate}</td>
                <td className="text-center">
                    <a href="javascript:void(0);" onClick={() => this.goToSpecifyPaySlips(item.Id, item.QuotationId ? item.QuotationId : "")}>
                        <i className="fa fa-list-ul text-navy" aria-hidden="true" title="Chi tiết" />
                    </a>
                </td>
            </tr>
        );
    }
    
    goToSpecifyPaySlips(paySlipId: number, quotationId: string) {
        window.location.href = `/#/admin/payslip-bill/${paySlipId}/${quotationId}`;
    }

    goToNewPaySlips() {
        window.location.href = "/#/admin/payslip-bill/";
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Danh sách phiếu chi</h5>
                            </div>

                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                        
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
                                                    onClick={this.onLoadPaySlips}>Tìm</button>
                                        </div>

                                        <table id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid"
                                            className="table table-striped table-bordered table-hover dataTables-example dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th className={this.showSortStatus("QuotationId")}
                                                        onClick={() => this.onSorting("QuotationId")}>Mã báo giá</th>
                                                    <th className={this.showSortStatus("Id")}
                                                        onClick={() => this.onSorting("Id")}>Mã phiếu thu</th>
                                                    <th className={this.showSortStatus("Money")}
                                                        onClick={() => this.onSorting("Money")}>Số tiền</th>
                                                    <th className={this.showSortStatus("Receiver")}
                                                        onClick={() => this.onSorting("Receiver")}>Người nộp tiền</th>                                                  
                                                    <th className={this.showSortStatus("CreateDate")}
                                                        onClick={() => this.onSorting("CreateDate")}>Ngày tạo</th>
                                                    <th className={this.showSortStatus("ModifiedDate")}
                                                        onClick={() => this.onSorting("ModifiedDate")}>Ngày chỉnh sửa</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.fetchPaySlips()}
                                            </tbody>
                                        </table>

                                        {this.showNavigationButtons()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <button type="button" onClick={this.goToNewPaySlips} className="btn btn-w-m btn-primary">Thêm mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                              
                <ToastContainer autoClose={5000} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        pagingResult: state.PayslipsFilterAndPagingReducer
    };
}

function mapDispatchToProps(dispatch: any) {
    let pagingAction = new FetchAction.PayslipsFilterAndPagingAction();
    
    return {
        loadPagingPaySlips: (entry: any) => dispatch(pagingAction.fetch(entry))
    }
}

const connectedPaySlipBills = connect(mapStateToProps, mapDispatchToProps)(PaySlipBills);
export { connectedPaySlipBills as PaySlipBills };
