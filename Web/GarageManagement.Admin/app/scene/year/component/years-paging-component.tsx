import React from "react";
import { IYear } from "../state/year-state";
import { PagingProps, CombinedProps, YearPagingMapping } from "../redux-mapping/year-paging-mapping";
import { YearForm } from "./year-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as LoadingHelper from "../../../component/common-helper/page-loading-helper";

class YearPaging extends BasePagingComponent<CombinedProps, IYear> {
    pagingElementId = "year-paging";
    navigationElementId = "year-navigation";
    
    constructor(props: CombinedProps, state: IPaging<IYear>) {
        super(props, state);
        this.onDeleteYear = this.onDeleteYear.bind(this);
    }
    
    initState() {
        initPagingState<IYear>();
        this.initialState = this.state;
    }

    onDeleteYear(event) {
        event.preventDefault();
        this.props.delete({ yearId: this.state.SelectedIdOnRow });
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }

    renderEachPagingRecord(item: IYear) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.ModelName}</td>
                <td>{item.Name}</td>
                <td className="text-center">
                    <Anchor click={this.alertCreateOrUpdatePopup.bind(this, "năm sản xuất", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.alertConfirmDeletePopup.bind(this, "năm sản xuất", item.Id)} 
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
                        onClick={() => this.onSorting("Id")}>Mã năm xe</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên dòng xe</th>
                    <th className={this.showSortStatus("Year")}
                        onClick={() => this.onSorting("Year")}>Năm</th>
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
                                <h5>Danh sách năm sản xuất</h5>
                            </div>

                            <div className="ibox-content" id={this.pagingElementId}>
                                <LoadingHelper.loadingIcon container={this.pagingElementId} />
                                
                                <div className="table-responsive">                                    
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                       click={this.alertCreateOrUpdatePopup.bind(this, "năm sản xuất")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <YearForm reloadYears={this.onLoadData}  
                                       closeModal={this.closeCreateOrUpdatePopup} 
                                       yearId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteYear, "năm sản xuất")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new YearPagingMapping().connectComponent(YearPaging);
export { connectedComponent as YearPaging };