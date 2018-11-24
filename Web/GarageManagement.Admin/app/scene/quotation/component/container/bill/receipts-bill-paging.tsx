import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import * as BaseComponent from "core/component/component";
import * as PagingModel from "core/component/model";
import * as PagingNavigation from "../../../../../core/control/paging/index";
import * as FetchAction from "../../../action/fetch-action";
import { IReceipts } from "../../../model/bill-model";
import { SortDirection } from "core/component/model";
import { Export } from "component/common/export-component";
import { ItemsPerPage } from "component/common/paging/items-perpage-component";
import { NoData } from "component/common/paging/nodata-component";

interface IReceiptBillsState extends PagingModel.IPaging<IReceipts> { }

class ReceiptBills extends React.Component<any, IReceiptBillsState> implements BaseComponent.IComponentState {
    private pageSize: number = 10;
    private numberPageRangeDisplay: number = 3;
    private isSelectItemsPerPage: boolean = false;
    private initialState: PagingModel.IPaging<IReceipts>;
    private pagingNavigation: PagingNavigation.NavigationSetting<IReceipts>;

    constructor(props: any) {
        super(props);

        this.onSearchInput = this.onSearchInput.bind(this);
        this.onLoadReceipts = this.onLoadReceipts.bind(this);
        
        this.initializeState();

        this.pagingNavigation = new PagingNavigation.NavigationSetting(
            {
                NavigationId: "Receipt_Bills_Navigation",
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
                DTOs: new Array<IReceipts>()
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
        this.onLoadReceipts();
    }

    onLoadReceipts() {
        this.props.loadPagingReceipts(this.state.Request);
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
        this.onLoadReceipts();
        this.isSelectItemsPerPage = true;
    }

    showItemsPerPage() {
        return (
            <ItemsPerPage Id="Receipt_Bills_ItemsPerPage"
                SelectedValue={this.state.Request.PageSize}
                onSelectItemsPerPage={(numberSelected) => this.onSelectItemsPerPage(numberSelected)} />
        );
    }

    onLoadReceiptsByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadReceipts();
        this.pagingNavigation.setGroupPageIndexForNextNavigation<IReceipts>(this.state);
    }

    onLoadReceiptsByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadReceipts();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation<IReceipts>(this.state);
    }

    onLoadReceiptsByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadReceipts();
    }

    showNavigationButtons() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            return this.pagingNavigation.showNavigationButtons<IReceipts>(this.state, this.isSelectItemsPerPage, 
                                                                          () => this.onLoadReceiptsByNextNavigation(),
                                                                          () => this.onLoadReceiptsByPrevNavigation(),
                                                                          (pageIndex) => this.onLoadReceiptsByPageSelected(pageIndex));
        }
    }

    onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
                                            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadReceipts();
    }

    showSortStatus(sortName: string) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }

    fetchReceipts() {
        let pagingResult = this.props.pagingResult.target;
        if (pagingResult.Success) {
            this.setResponseState(pagingResult.Data);
            let dtosResponse = pagingResult.Data.DTOs;
            return (
                dtosResponse.length ?
                dtosResponse.map((receipt, i) => { return this.fetchReceipt(receipt) }) 
                                                    : <NoData ColSpan={7} />
            )
        }
    }
    
    fetchReceipt(item: IReceipts) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.QuotationId ? item.QuotationId : ""}</td>
                <td>{item.Id}</td>
                <td>{item.Money}</td>
                <td>{item.Payer}</td>
                <td>{item.CreateDate}</td>
                <td>{item.ModifiedDate}</td>
                <td className="text-center">
                    <a href="javascript:void(0);" onClick={() => this.goToSpecifyReceipts(item.Id, item.QuotationId ? item.QuotationId : "")}>
                        <i className="fa fa-list-alt text-navy" aria-hidden="true" title="Chi tiết" />
                    </a>
                </td>
            </tr>
        );
    }
    
    goToSpecifyReceipts(receiptId: number, quotationId: string) {
        window.location.href = `/#/admin/receipts-bill/${receiptId}/${quotationId}`;
    }

    goToNewReceipts() {
        window.location.href = "/#/admin/receipts-bill/";
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Danh sách phiếu thu</h5>
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
                                                    onClick={this.onLoadReceipts}>Tìm</button>
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
                                                    <th className={this.showSortStatus("Payer")}
                                                        onClick={() => this.onSorting("Payer")}>Người nộp tiền</th>                                                  
                                                    <th className={this.showSortStatus("CreateDate")}
                                                        onClick={() => this.onSorting("CreateDate")}>Ngày tạo</th>
                                                    <th className={this.showSortStatus("ModifiedDate")}
                                                        onClick={() => this.onSorting("ModifiedDate")}>Ngày chỉnh sửa</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.fetchReceipts()}
                                            </tbody>
                                        </table>

                                        {this.showNavigationButtons()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <button type="button" onClick={this.goToNewReceipts} className="btn btn-w-m btn-primary">Thêm mới</button>
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
        pagingResult: state.ReceiptsFilterAndPagingReducer
    };
}

function mapDispatchToProps(dispatch: any) {
    let pagingAction = new FetchAction.ReceiptsFilterAndPagingAction();
    
    return {
        loadPagingReceipts: (entry: any) => dispatch(pagingAction.fetch(entry))
    }
}

const connectedReceiptBills = connect(mapStateToProps, mapDispatchToProps)(ReceiptBills);
export { connectedReceiptBills as ReceiptBills };
