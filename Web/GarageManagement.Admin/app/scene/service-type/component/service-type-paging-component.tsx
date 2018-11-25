import React from "react";
import { IServiceType } from "../state/service-type-state";
import { PagingProps, CombinedProps, ServiceTypePagingMapping } from "../redux-mapping/service-type-paging-mapping";
import { ServiceTypeForm } from "./service-type-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import * as LoadingHelper from "../../../component/common-helper/page-loading-helper";

class ServiceTypePaging extends BasePagingComponent<CombinedProps, IServiceType> {
    pagingElementId = "service-type-paging";
    navigationElementId = "service-type-navigation";
    
    constructor(props: CombinedProps, state: IPaging<IServiceType>) {
        super(props, state);
        this.onDeleteServiceType = this.onDeleteServiceType.bind(this);
    }

    initState() {
        initPagingState<IServiceType>();
        this.initialState = this.state;
    }
    
    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteServiceType(event) {
        event.preventDefault();
        this.props.delete({serviceTypeId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request)
    }
    
    renderEachPagingRecord(item: IServiceType) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.ParentName}</td>
                <td className="text-center">
                    <Anchor click={this.showCreateOrUpdatePopup.bind(this, "loại dịch vụ", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.showConfirmDeletePopup.bind(this, "loại dịch vụ", item.Id)} 
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
                        onClick={() => this.onSorting("Id")}>Mã dịch vụ</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên dịch vụ</th>
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
                                <h5>Danh sách loại dịch vụ</h5>
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
                                                       click={this.showCreateOrUpdatePopup.bind(this, "loại dịch vụ")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <ServiceTypeForm reloadServiceTypes={this.onLoadData}  
                                         closeModal={this.closeCreateOrUpdatePopup} 
                                         serviceTypeId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteServiceType, "loại dịch vụ")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new ServiceTypePagingMapping().connectComponent(ServiceTypePaging);
export { connectedComponent as ServiceTypePaging };
