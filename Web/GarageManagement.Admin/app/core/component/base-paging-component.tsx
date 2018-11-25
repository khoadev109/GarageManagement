import React from "react";
import AppCommon from "./base-component";
import ToastHelper from "../../component/common-helper/toast-helper";
import { ToastContainer } from "react-toastify";
import { IModal } from "../state/modal-state";
import { NoData } from "../../component/common/paging/nodata-component";
import { Navigation } from "../../component/common/paging/navigation-component";
import { ItemsPerPage } from "../../component/common/paging/items-perpage-component";
import { GeneralModal } from "component/common/modal-component";
import { stringOrNumberType } from "../library/data-type";
import { Br } from "../../component/common/common-component";
import { Searchbox } from "../../component/control/searchbox-component";
import { Button } from "../../component/control/button-component";
import * as Loading from "../../component/common-helper/page-loading-helper";

export enum SortDirection {
    Asc = "Ascending",
    Desc = "Descending"
}

export interface IPaging<S> extends IModal {
    SelectedIdOnRow?: number | string,
    Request: {
        SearchTerm?: string,
        SortName: string,
        SortDirection: string,
        PageIndex: number,
        PageSize: number
    },
    Response: {
        CurrentPage: number,
        TotalRows: number,
        TotalPages: number,
        HasNext: boolean,
        HasPrevious: boolean,
        DTOs: Array<S>
    },
    Navigation: {
        FromPage: number,
        ToPage: number
    }
}

export interface IPagingComponent<S> {
    pagingElementId: string;
    navigationElementId: string;
    onLoadData: () => void;
    renderPagingHeader();
    renderEachPagingRecord(record: S);
}

export abstract class BasePagingComponent<P, OS>
       extends AppCommon.BaseComponent<P, IPaging<OS>> implements IPagingComponent<OS> {
    
    public abstract pagingElementId: string;
    public abstract navigationElementId: string;

    protected initialState: IPaging<OS>;
    protected navigationPageRange = 5;
    protected navigationMaxNumberChange = 3;
        
    constructor(props: P, state: IPaging<OS>) {
        super(props, state);
        
        this.onLoadData = this.onLoadData.bind(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.closeDeletePopup = this.closeDeletePopup.bind(this);
        this.closeCreateOrUpdatePopup = this.closeCreateOrUpdatePopup.bind(this);
    }

    public abstract onLoadData();
    public abstract renderPagingHeader();
    public abstract renderEachPagingRecord(record: OS);

    protected closeCreateOrUpdatePopup() {
        this.setState({
            Title: "",
            SelectedIdOnRow: "",
            IsOpenCreateOrUpdateModal: false
        });
    }

    protected closeDeletePopup() {
        this.setState({
            Title: "",
            SelectedIdOnRow: "",
            IsOpenDeleteModal: false
        });
    }
    
    protected showCreateOrUpdatePopup(title: string, Id?: stringOrNumberType) {
        this.setState({
            Title: Id ? `Cập nhật ${title}` : `Thêm mới ${title}`,
            SelectedIdOnRow: Id ? Id : "",
            IsOpenCreateOrUpdateModal: true
        });
    }
    
    protected showConfirmDeletePopup(title: string, Id: stringOrNumberType) {
        this.setState({
            Title: `Bạn có chắc muốn xóa ${title} này không?`,
            SelectedIdOnRow: Id,
            IsOpenDeleteModal: true
        });
    }

    protected handleDeleteActionFromServer(currentTarget: any, newTarget: any) {
        const isPropsChanged = this.isPropsChanged(currentTarget, newTarget);
        if (isPropsChanged) {
            if (newTarget.Success) {
                this.initialState.Request.PageIndex = 1;
                this.setState(this.initialState);
                this.closeDeletePopup();
                this.onLoadData();
            } else {
                const errorMessage = this.getErrorMessageFromServer(newTarget);
                if (errorMessage) {
                    ToastHelper.notifyError(errorMessage);
                    this.closeDeletePopup();
                }
            }
        }
    }
    
    protected handlePagingResponseFromServer(currentTarget: any, newTarget: any) {
        if (newTarget != currentTarget) {
            if (newTarget.Success) {
                const dataResponse = newTarget.Data;
                
                this.setState({
                    Response: {
                        CurrentPage : dataResponse.CurrentPage,
                        TotalRows : dataResponse.TotalRows,
                        TotalPages : dataResponse.TotalPages,
                        HasNext : dataResponse.HasNext,
                        HasPrevious : dataResponse.HasPrevious,
                        DTOs : dataResponse.DTOs
                    }
                }, () => { 
                    Loading.showLoading(false, this.pagingElementId);
                });
            }
        }
    }

    protected onSelectItemsPerPage(numberOfItems: number) {
        this.state.Request.PageIndex = 1;
        this.state.Request.PageSize = numberOfItems;
        this.state.Navigation.FromPage = 1;
        this.onLoadData();
    }

    protected onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection === SortDirection.Asc
                                            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadData();
    }

    protected showSortStatus(sortName: string) {
        if (sortName !== this.state.Request.SortName)
            return "sorting";
        if (this.state.Request.SortDirection === SortDirection.Asc)
            return "sorting_asc";
        if (this.state.Request.SortDirection === SortDirection.Desc)
            return "sorting_desc";
    }

    protected onSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
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

    private setGroupPagesWhenTotalPagesLessThanDefaultPageRange() {
        if (this.state.Response.TotalPages < this.navigationPageRange) {
            this.state.Navigation.FromPage = 1;
            this.state.Navigation.ToPage = this.state.Response.TotalPages;
            return;
        }
    }

    private onLoadDataByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.onLoadData();
    }

    private onLoadDataByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.onLoadData();
        this.setGroupPageRangeForPreviousOrNextNavigation();
    }

    private onLoadDataByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.onLoadData();
        this.setGroupPageRangeForPreviousOrNextNavigation(false);
    }
    
    private setGroupPageRangeForPreviousOrNextNavigation(isNext = true) {
        const isPageIndexSmallerOrEqualMaxNumberPageChange = this.state.Request.PageIndex <= this.navigationMaxNumberChange;
        const pageRangeBetweenTotalPagesAndDefaultPageRange = this.state.Response.TotalPages - this.navigationPageRange;

        if (this.state.Response.TotalPages <= this.navigationPageRange && isPageIndexSmallerOrEqualMaxNumberPageChange) {
            this.setFromPageToPageForNavigation(1, this.navigationPageRange);
        } else if (this.state.Request.PageIndex >= pageRangeBetweenTotalPagesAndDefaultPageRange) {
            this.setFromPageToPageForNavigation(pageRangeBetweenTotalPagesAndDefaultPageRange, this.state.Response.TotalPages);
        } else {
            const fromPage = this.state.Navigation.FromPage + (isNext ? 1 : -1);
            const toPage = this.state.Navigation.FromPage + (isNext ? 1 : -1);

            this.setFromPageToPageForNavigation(fromPage, toPage);
        }
    }

    private setFromPageToPageForNavigation(fromPage: number, toPage: number) {
        this.state.Navigation.FromPage = fromPage;
        this.state.Navigation.ToPage = toPage;
    }

    protected renderPagingSection() {
        return (
            <React.Fragment>
                {this.renderNumberOfItemsPerPage()}
                {this.renderSearchInput()}
                {this.renderPagingGrid()}
                {this.renderNavigationButtons()}
            </React.Fragment>
        )
    }

    private renderNumberOfItemsPerPage() {
        return (
            <ItemsPerPage Id="items-per-page"
                SelectedValue={this.state.Request.PageSize}
                onSelectItemsPerPage={(numberSelected) => this.onSelectItemsPerPage(numberSelected)} />
        )
    }

    private renderSearchInput() {
        return (
            <div className="dataTables_filter">
                <label>
                    <Searchbox value={this.state.Request.SearchTerm} changeEvent={e => this.onSearchInput(e)} />
                </label>
                <Button moreClass="btn-w-m" text="Tìm" click={this.onLoadData} />
            </div>
        );
    }

    private renderPagingGrid() {
        return (
            <table aria-describedby="DataTables_Table_0_info" role="grid"
                   className="table table-striped table-bordered table-hover dataTables-example dataTable">
                <thead>
                    {this.renderPagingHeader()}
                </thead>                                            
                <tbody>
                    {this.renderPagingRecords()}
                </tbody>
            </table>
        )
    }

    private renderPagingRecords() {
        if (this.state.Response.DTOs.length)
            return ( this.state.Response.DTOs.map(record => { return this.renderEachPagingRecord(record) }) );
        return <NoData />
    }

    private renderNavigationButtons() {
        this.setGroupPagesWhenTotalPagesLessThanDefaultPageRange();

        // missing check items per page
        if (false) {
            this.state.Navigation.ToPage = this.navigationPageRange < this.state.Response.TotalPages 
                                                ? this.navigationPageRange 
                                                : this.state.Response.TotalPages;
        }

        return (
            <Navigation Id={this.navigationElementId}
                        CurrentPage={this.state.Response.CurrentPage}
                        HasNext={this.state.Response.HasNext}
                        HasPrevious={this.state.Response.HasPrevious}
                        PageRange={this.state.Navigation}
                        onLoadByNextNavigation={() => this.onLoadDataByNextNavigation()}
                        onLoadByPrevNavigation={() => this.onLoadDataByPrevNavigation()}
                        onLoadByPageSelectedNavigation={(pageIndex: number) => this.onLoadDataByPageSelected(pageIndex)} />
        )
    }

    protected renderCreateOrUpdatePopup(createOrUpdateform: any) {
        return (
            <GeneralModal size={"large"} title={this.state.Title} 
                          isOpen={this.state.IsOpenCreateOrUpdateModal} 
                          close={this.closeCreateOrUpdatePopup}>
                {createOrUpdateform}
            </GeneralModal>
        )
    }
    
    protected renderDeletePopup(deleteFunc: (event: any) => void, moduleName: string) {
        return (
            <GeneralModal size={"small"} title={this.state.Title} 
                          isOpen={this.state.IsOpenDeleteModal} 
                          close={this.closeDeletePopup}>
                          
                <div className="text-center">
                    <div>{AppCommon.DELETE_MESSAGE(moduleName)}</div>
                    <Br />
                    <Button text="OK" click={e => deleteFunc(e)} />
                </div>
            </GeneralModal>
        )
    }
    
    protected renderToastContainer() {
        return <ToastContainer autoClose={1500} />
    }
}
