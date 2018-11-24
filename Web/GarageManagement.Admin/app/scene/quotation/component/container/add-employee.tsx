import React from "react";
import { connect } from "react-redux";

import * as BaseComponent from "core/component/component";
import * as PagingModel from "core/component/model";
import * as PagingNavigation from "../../../../core/control/paging/index";
import { stringOrEmpty } from "../../../../core/library/data-type";

import * as EmployeeFetchAction from "../../../employee/action/fetch-action";
import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";

import { IEmployee } from "../../model/employee-info-model";

import { SortDirection } from "core/component/model";
import { ItemsPerPage } from "component/common/paging/items-perpage-component";
import { NoData } from "component/common/paging/nodata-component";

interface IEmployeeState extends PagingModel.IPaging<IEmployee> {
    QuotationId: stringOrEmpty;
    EmployeeIdsSelected: Array<string>
}

class EmployeesQuotation extends React.Component<any, IEmployeeState> implements BaseComponent.IComponentState {
    private pageSize: number = 10;
    private numberPageRangeDisplay: number = 3;
    private isLoadedEmployees: boolean = false;
    private isUpdatedEmployees: boolean = false;
    private isSelectItemsPerPage: boolean = false;
    private afterSelectItemsPerPageLoaded: boolean = false;
    private initialState: IEmployeeState;
    private pagingNavigation: PagingNavigation.NavigationSetting<IEmployee>;

    constructor(props: any) {
        super(props);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.updateEmployeeQuotation = this.updateEmployeeQuotation.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.reloadEmployees = this.reloadEmployees.bind(this);
        
        this.initializeState();

        this.pagingNavigation = new PagingNavigation.NavigationSetting(
            {
                NavigationId: "Employee_Navigation",
                NumberPageRangeDisplay: this.numberPageRangeDisplay
            }
        );
    }

    initializeState() {
        this.initialState = {
            QuotationId: "",
            EmployeeIdsSelected: new Array<string>(),
            SelectedIdOnRow: "",
            Request: {
                SearchTerm: "",
                SortName: "Name",
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
                DTOs: new Array<IEmployee>()
            },
            Navigation: {
                FromPage: 1,
                ToPage: this.numberPageRangeDisplay
            }
        };
        this.state = this.initialState;
        this.initialState.EmployeeIdsSelected = null;
    }

    closePopup() {
        this.props.closeModal();
    }

    reloadEmployees() {
        this.props.reloadEmployees();
    }

    componentWillReceiveProps(nextProps) {
        let employeesQuotationResult = nextProps.employeesQuotationResult.target;
        if (employeesQuotationResult.Success && !this.isLoadedEmployees) {
            let existingEmployeeIds = new Array<string>();

            employeesQuotationResult.Data.map((employee, i) => { 
                existingEmployeeIds.push(employee.Id);
            });

            this.setState({EmployeeIdsSelected: existingEmployeeIds});
            this.isLoadedEmployees = true;
        }          

        let employeeQuotationUpdateResult = nextProps.employeeQuotationUpdateResult.target;
        if (employeeQuotationUpdateResult.Success && this.initialState.EmployeeIdsSelected != null && !this.isUpdatedEmployees) {
            this.isUpdatedEmployees = true;
            this.closePopup();
        }  
    }

    componentDidMount() {
        this.onLoadEmployees();
    }

    onLoadEmployees() {
        this.props.loadEmployeesByQuotation();
        this.props.loadPagingEmployees(this.state.Request);
    }

    setResponseState(dataResponse: any) {
        this.state.Response.CurrentPage = dataResponse.CurrentPage;
        this.state.Response.TotalRows = dataResponse.TotalRows;
        this.state.Response.TotalPages = dataResponse.TotalPages;
        this.state.Response.HasNext = dataResponse.HasNext;
        this.state.Response.HasPrevious = dataResponse.HasPrevious;
        this.state.Response.DTOs = dataResponse.DTOs;
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
        this.onLoadEmployees();
        this.isSelectItemsPerPage = true;
    }

    showItemsPerPage() {
        return (
            <ItemsPerPage Id="Employee_ItemsPerPage"
                          SelectedValue={this.state.Request.PageSize}
                          onSelectItemsPerPage={(numberSelected) => this.onSelectItemsPerPage(numberSelected)} />
        );
    }

    onLoadEmployeesByNextNavigation() {
        this.state.Request.PageIndex += 1;
        this.isSelectItemsPerPage = false;
        this.onLoadEmployees();
        this.pagingNavigation.setGroupPageIndexForNextNavigation<IEmployee>(this.state);
    }

    onLoadEmployeesByPrevNavigation() {
        this.state.Request.PageIndex -= 1;
        this.isSelectItemsPerPage = false;
        this.onLoadEmployees();
        this.pagingNavigation.setGroupPageIndexForPrevNavigation<IEmployee>(this.state);
    }

    onLoadEmployeesByPageSelected(pageIndex: number) {
        this.state.Request.PageIndex = pageIndex;
        this.isSelectItemsPerPage = false;
        this.onLoadEmployees();
    }
    
    showNavigationButtons() {
        let employeesFilterResult = this.props.employeesFilterResult.target;
        if (employeesFilterResult.Success) {
            return this.pagingNavigation.showNavigationButtons<IEmployee>(this.state, this.isSelectItemsPerPage, 
                                                                          () => this.onLoadEmployeesByNextNavigation(),
                                                                          () => this.onLoadEmployeesByPrevNavigation(),
                                                                          (pageIndex) => this.onLoadEmployeesByPageSelected(pageIndex));
        }
    }

    onSorting(sortingName: string) {
        this.state.Request.SortName = sortingName;
        this.state.Request.SortDirection = this.state.Request.SortDirection == SortDirection.Asc
                                            ? SortDirection.Desc : SortDirection.Asc;
        this.onLoadEmployees();
    }

    showSortStatus(sortName: string) {
        if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Asc)
            return "sorting_asc";
        else if (sortName == this.state.Request.SortName && this.state.Request.SortDirection == SortDirection.Desc)
            return "sorting_desc";
        else
            return "sorting";
    }
    
    updateEmployeeQuotation() {
        this.props.updateEmployees(this.state.EmployeeIdsSelected);
    }
    
    addEmployeeToQuotation(event: any, employeeId: string) {
        let employeeSelected: Array<string> = this.state.EmployeeIdsSelected;

        let isCheckingEmployee: boolean = event.target.checked;
        let isEmployeeAlreadyExisted: boolean = employeeSelected.some(x => x == employeeId);

        if (isEmployeeAlreadyExisted && !isCheckingEmployee)
            employeeSelected = employeeSelected.filter(x => x != employeeId);
        
        if (!isEmployeeAlreadyExisted && isCheckingEmployee)
            employeeSelected.push(employeeId);

        this.initialState.EmployeeIdsSelected = employeeSelected;
        this.setState({ EmployeeIdsSelected: employeeSelected });
    }

    autoCheckExistingEmployees(employeeId: string) {
        if (this.state.EmployeeIdsSelected)
            return this.state.EmployeeIdsSelected.some(existingEmployeeId => existingEmployeeId == employeeId);
        return false;
    }

    fetchEmployee(item: IEmployee) {
        return (
            <tr className="gradeA odd" role="row" key={item.Id}>
                <td className="sorting_1">{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Phone}</td>
                <td className="text-center">
                    <input type="checkbox" checked={this.autoCheckExistingEmployees(item.Id)}
                           onChange={event => this.addEmployeeToQuotation(event, item.Id)} />
                </td>
            </tr>
        );
    }

    fetchEmployees() {
        let employeesFilterResult = this.props.employeesFilterResult.target;
        if (employeesFilterResult.Success) {
            this.setResponseState(employeesFilterResult.Data);
            let dtosResponse = employeesFilterResult.Data.DTOs;
            return (
                dtosResponse.length ?
                    dtosResponse.map((employee, i) => { return this.fetchEmployee(employee) }) : <NoData />
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                        <div id="DataTables_Table_0_filter" style={{ float: "right" }} className="dataTables_filter">
                                            <label>
                                                Nhập từ khóa:
                                                <input type="search"
                                                    placeholder="Tìm kiếm"
                                                    className="form-control input-sm"
                                                    aria-controls="DataTables_Table_0"
                                                    value={this.state.Request.SearchTerm}
                                                    onChange={e => this.onSearchInput(e)} />
                                            </label>
                                            <button type="button"
                                                className="btn btn-w-m btn-primary"
                                                onClick={() => this.onLoadEmployees()}>Tìm</button>
                                        </div>
                                        {this.showItemsPerPage()} 
                                        <br/><br/><br/>
                                        <table id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid"
                                            className="table table-striped table-bordered table-hover dataTables-example dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th className={this.showSortStatus("Id")}
                                                        onClick={() => this.onSorting("Id")}>Mã nhân viên</th>
                                                    <th className={this.showSortStatus("Name")}
                                                        onClick={() => this.onSorting("Name")}>Họ tên</th>
                                                    <th className={this.showSortStatus("Phone")}
                                                        onClick={() => this.onSorting("Phone")}>Số điện thoại</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.fetchEmployees()}
                                            </tbody>
                                        </table>

                                        {this.showNavigationButtons()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <button type="button" onClick={this.updateEmployeeQuotation} className="btn btn-w-m btn-primary">Cập nhật</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        employeesFilterResult: state.EmployeesWithPagingReducer,
        employeesQuotationResult: state.QuotationEmployeesReducer,
        employeeQuotationUpdateResult: state.QuotationEmployeesUpdateReducer
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
    let employeePagingAction = new EmployeeFetchAction.EmployeesPagingAction();
    let employeesQuotationAction = new FetchAction.QuotationEmployeesAction();
    let updateEmployeeQuotationAction = new PostAction.QuotationEmployeesUpdateAction();

    return {
        quotationId: ownProps.quotationId,
        closeModal: ownProps.closeModal,
        loadEmployeesByQuotation: () => dispatch(employeesQuotationAction.fetch(ownProps.quotationId)),
        loadPagingEmployees: (entry: any) => dispatch(employeePagingAction.fetch(entry)),
        updateEmployees: (employeeIdsWillUpdate: any) => dispatch(updateEmployeeQuotationAction.updateEmployees(ownProps.quotationId, employeeIdsWillUpdate))
    }
}

const connectedEmployeesQuotation = connect(mapStateToProps, mapDispatchToProps)(EmployeesQuotation);
export { connectedEmployeesQuotation as EmployeesQuotation };
