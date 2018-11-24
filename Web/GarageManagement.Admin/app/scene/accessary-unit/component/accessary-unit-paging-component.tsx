import React from "react";
import { IAccessaryUnit } from "../state/accessary-unit-state";
import { AccessaryUnitForm } from "./accessary-unit-form-component";
import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
import { initPagingState } from "core/state/paging-state-handler";
import { Anchor } from "component/control/anchor-component";
import { WrapperButton } from "component/control/button-component";
import { PagingProps, CombinedProps, AccessaryUnitPagingMapping } from "../redux-mapping/accessary-unit-paging-mapping";
import * as Loading from "component/common-helper/page-loading-helper";

class AccessaryUnitPaging extends BasePagingComponent<CombinedProps, IAccessaryUnit> {
    pagingElementId = "accessary-unit-paging";
    navigationElementId = "accessary-unit-navigation";

    constructor(props: CombinedProps, state: IPaging<IAccessaryUnit>) {
        super(props, state);
        this.onDeleteAccessaryUnit = this.onDeleteAccessaryUnit.bind(this);
    }

    initState() {
        initPagingState<IAccessaryUnit>();
        this.initialState = this.state;
    }
    
    componentWillReceiveProps(nextProps: PagingProps) {
        this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
        this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
    }
    
    componentDidMount() {
       this.onLoadData();
    }

    onDeleteAccessaryUnit(event) {
        event.preventDefault();
        this.props.delete({accessaryUnitId: this.state.SelectedIdOnRow });
    }

    onLoadData() {
        Loading.showLoading(true, this.pagingElementId);
        this.props.loadPagingData(this.state.Request);
    }
    
    renderEachPagingRecord(item: IAccessaryUnit) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td className="text-center">
                    <Anchor click={() => { this.alertCreateOrUpdatePopup("đơn vị tính phụ tùng", item.Id) }} 
                            content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
                </td>
                <td className="text-center">
                    <Anchor click={() => { this.alertConfirmDeletePopup("đơn vị tính phụ tùng", item.Id) }} 
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
                                <h5>Danh sách loại phụ kiện</h5>
                            </div>
                            <div className="ibox-content" id="accessary-unit-paging">
                                <Loading.loadingIcon container="accessary-unit-paging" />  

                                <div className="table-responsive">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap">
                                        {this.renderPagingSection()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
                                                       click={() => this.alertCreateOrUpdatePopup("đơn vị tính phụ tùng")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderCreateOrUpdatePopup(
                        <AccessaryUnitForm reloadAccessaryUnits={this.onLoadData}  
                                           closeModal={this.closeCreateOrUpdatePopup} 
                                           accessaryUnitId={this.state.SelectedIdOnRow} />)}
                
                {this.renderDeletePopup(this.onDeleteAccessaryUnit, "đơn vị tính")}
                {this.renderToastContainer()}
            </React.Fragment>
        );
    }
}

const connectedComponent = new AccessaryUnitPagingMapping().connectComponent(AccessaryUnitPaging);
export { connectedComponent as AccessaryUnitPaging };
