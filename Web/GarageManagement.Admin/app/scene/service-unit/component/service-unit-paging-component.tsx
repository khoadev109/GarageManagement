import React from "react";
import { IServiceUnit } from "../state/service-unit-state";
import { PagingProps, CombinedProps, ServiceUnitPagingMapping } from "../redux-mapping/service-unit-paging-mapping";
import { ServiceUnitForm } from "./service-unit-form-component";
import { initPagingState } from "core/state/paging-state-handler";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { Anchor } from "../../../component/control/anchor-component";
import { WrapperButton } from "../../../component/control/button-component";
import * as LoadingHelper from "../../../component/common-helper/page-loading-helper";

class ServiceUnitPaging extends BasePagingComponent<CombinedProps, IServiceUnit> {
    pagingElementId = "service-unit-paging";
    navigationElementId = "service-unit-navigation";
    
    constructor(props: CombinedProps, state: IPaging<IServiceUnit>) {
        super(props, state);
        this.onDeleteServiceUnit = this.onDeleteServiceUnit.bind(this);
    }
    
    initState() {
        initPagingState<IServiceUnit>();
        this.initialState = this.state;
    }
    
    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }

    componentDidMount() {
        this.onLoadData();
    }

    onDeleteServiceUnit(event) {
        event.preventDefault();
        this.props.delete({serviceUnitId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        LoadingHelper.showLoading(true, this.pagingElementId);
        this.props.loadPaging(this.state.Request);
    }
       
    renderEachPagingRecord(item: IServiceUnit) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td className="text-center">
                    <Anchor click={this.showCreateOrUpdatePopup.bind(this, "đơn vị công dịch vụ", item.Id)}
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={this.showConfirmDeletePopup.bind(this, "đơn vị công dịch vụ", item.Id)} 
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
                        onClick={() => this.onSorting("Id")}>Mã đơn vị</th>
                    <th className={this.showSortStatus("Name")}
                        onClick={() => this.onSorting("Name")}>Tên đơn vị</th>
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
                                <h5>Danh sách đơn vị (công dịch vụ)</h5>
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
                                                       click={this.showCreateOrUpdatePopup.bind(this, "đơn vị công dịch vụ")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <ServiceUnitForm reloadServiceUnits={this.onLoadData}  
                                         closeModal={this.closeCreateOrUpdatePopup} 
                                         serviceUnitId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteServiceUnit, "đơn vị")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new ServiceUnitPagingMapping().connectComponent(ServiceUnitPaging);
export { connectedComponent as ServiceUnitPaging };
