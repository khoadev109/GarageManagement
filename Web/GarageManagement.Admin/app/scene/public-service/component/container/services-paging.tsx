// import React from "react";
// import { connect } from "react-redux";
// import { ToastContainer } from "react-toastify";

// import { IPublicService } from "../../state/service-state";
// import { SortDirection } from "core/component/model";
// import { Export } from "component/common/export-component";
// import { ItemsPerPage } from "component/common/paging/items-perpage-component";
// import { NoData } from "component/common/paging/nodata-component";
// import { GeneralModal } from "component/common/modal-component";
// import * as Loading from "component/common/loading-icon/loader";
// import { PagingProps, CombinedProps, ServicePagingMapping } from "../../redux-mapping/services-paging-mapping"
// import { initPagingState } from "core/state/paging-state-handler";
// import { BasePagingComponent, IPaging } from "core/component/base-paging-component";
// import * as LoadingHelper from "component/common-helper/page-loading-helper";
// import { Anchor } from "component/control/anchor-component";
// import { WrapperButton } from "component/control/button-component";
// import { PublicServivceForm } from "./service-form";
// class PublicServices extends BasePagingComponent<CombinedProps, IPublicService> {
//     pagingElementId = "service-paging";
//     navigationElementId = "service-navigation";

//     constructor(props: CombinedProps, state: IPaging<IPublicService>) {
//         super(props, state);
//         this.onDeleteService = this.onDeleteService.bind(this);
//     }

//     initState() {
//         initPagingState<IPublicService>();
//         this.initialState = this.state;
//     }

//     componentWillReceiveProps(nextProps: PagingProps) {
//         this.handlePagingResponseFromServer(this.props.pagingResult.target, nextProps.pagingResult.target);
//         this.handleDeleteActionFromServer(this.props.deleteResult.target, nextProps.deleteResult.target);
//     }

//     componentDidMount() {
//         this.onLoadData();
//     }

//     onDeleteService(event: any) {
//         event.preventDefault();
//         this.props.delete({ serviceId: this.state.SelectedIdOnRow });
//     }

//     onLoadData() {
//         LoadingHelper.showLoading(true, this.pagingElementId);
//         this.props.loadPaging(this.state.Request);
//     }

//     renderEachPagingRecord(item: IPublicService) {
//         return (
//             <tr className="gradeA odd" role="row" key={item.Id}>
//                 <td className="sorting_1">{item.Id}</td>
//                 <td>{item.Name}</td>
//                 <td>{item.Cost}</td>
//                 <td className="text-center">
//                     <Anchor click={this.showCreateOrUpdatePopup.bind(this, "dịch vụ", item.Id)}
//                             content={<i className="fa fa-pencil text-navy" aria-hidden="true"/>} />
//                 </td>
//                 <td className="text-center">
//                 <td className="text-center"></td>
//                     <Anchor click={this.showConfirmDeletePopup.bind(this, "dịch vụ", item.Id)} 
//                             content={<i className="fa fa-times text-navy" aria-hidden="true"/>} />
//                 </td>
//             </tr>
//         )
//     }

//     renderPagingHeader() {
//         return (
//             <React.Fragment>
//                 <tr role="row">
//                     <th className={this.showSortStatus("Id")}
//                         onClick={() => this.onSorting("Id")}>Mã dịch vụ</th>
//                     <th className={this.showSortStatus("Name")}
//                         onClick={() => this.onSorting("Name")}>Tên dịch vụ</th>
//                     <th className={this.showSortStatus("Address")}
//                         onClick={() => this.onSorting("Address")}>Giá dịch vụ</th>
//                     <th colSpan={2}></th>                               
//                 </tr>
//             </React.Fragment>
//         )
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="ibox float-e-margins">
//                             <div className="ibox-title">
//                                 <h5>Danh sách dịch vụ</h5>
//                             </div>

//                             <div className="ibox-content" id="services-paging">
//                                 <Loading.loadingIcon container="services-paging" />

//                                 <div className="table-responsive">
//                                     <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
//                                         {this.renderPagingSection()}
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-lg-12 text-right">
//                                     <WrapperButton moreClass="btn-w-m" textAlign="text-right" text="Thêm mới"
//                                                     click={this.showCreateOrUpdatePopup.bind(this, "dịch vụ")} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {this.renderCreateOrUpdatePopup(
//                         <PublicServivceForm reloadAccessaries={this.onLoadData}  
//                                        closeModal={this.closeCreateOrUpdatePopup} 
//                                        accessaryId={this.state.SelectedIdOnRow} />)}
                
//                 {this.renderDeletePopup(this.onDeleteService, "dịch vụ")}
//                 {this.renderToastContainer()}
//             </React.Fragment>
//         );
//     }
// }

// const connectedComponent = new ServicePagingMapping().connectComponent(PublicServices);
// export { connectedComponent as PublicServices };
