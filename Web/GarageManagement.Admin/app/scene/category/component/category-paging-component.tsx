import React from "react";
import { ICategory } from "../state/category-state";
import { CategoryForm } from "./category-form-component";
import { initPagingState } from "../../../core/state/paging-state-handler"
import { PagingProps, CombinedProps, CategoryPagingMapping } from "../redux-mapping/category-paging-mapping";
import { BasePagingComponent, IPaging } from "../../../core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as Loading from "../../../component/common-helper/page-loading-helper";

class CategoryPaging extends BasePagingComponent<CombinedProps, ICategory> {
    pagingElementId = "category-paging";
    navigationElementId = "category-navigation";

    constructor(props: CombinedProps, state: IPaging<ICategory>) {
        super(props, state);
        this.onDeleteCategory = this.onDeleteCategory.bind(this);
    }

    initState() {
        initPagingState<ICategory>();
        this.initialState = this.state;
    }

    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteCategory(event: any) {
        event.preventDefault();
        this.props.deleteCategory({ categoryId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPagingData(this.state.Request);
    }
    
    renderEachPagingRecord(item: ICategory) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.ParentName}</td>                
                <td className="text-center">
                    <Anchor click={() => { this.alertCreateOrUpdatePopup("danh mục", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.alertConfirmDeletePopup("danh mục", item.Id) }} 
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
                        onClick={() => this.onSorting("Id")}>Mã danh mục</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên danh mục</th>
                    <th className={this.showSortStatus("ParentName")}
                        onClick={() => this.onSorting("ParentName")}>Danh mục cha</th>                                                    
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
                                <h5>Danh sách danh mục</h5>
                            </div>
                            <div className="ibox-content" id={this.pagingElementId}>
                                <Loading.loadingIcon container={this.pagingElementId} />

                                <div className="table-responsive">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                   click={() => this.alertCreateOrUpdatePopup("danh mục")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <CategoryForm reloadCategories={this.onLoadData}  
                                       closeModal={this.closeCreateOrUpdatePopup} 
                                       categoryId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteCategory, "danh mục")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new CategoryPagingMapping().connectComponent(CategoryPaging);
export { connectedComponent as CategoryPaging };
