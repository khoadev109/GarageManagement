import React from "react";
import { connect } from "react-redux";
import VirtualizedSelect from "react-virtualized-select";

import * as BaseComponent from "../../../core/component/component";
import * as Loading from "component/common/loading-icon/loader";
import { IModal } from "component/control/popup/modal-state";

import { GeneralModal } from "component/common/modal-component";
import { EmployeeForm } from "../../../employee/component/container/employee-form";
import { AccessaryForm } from "../../../accessary/component/accessary-form-component";
import { PublicServivceForm } from "../../../public-service/component/container/service-form";

import { IQuotationItem } from "../../model/quotation-item-model";
import { QuotationStatus } from "../../model/quotation-info-model";
import { Accessary, Service, Employee } from "core/state/general-state";

import * as FetchAction from "../../action/fetch-action";
import * as AccessaryFetchAction from "../../../accessary/action/fetch-action";
import * as ServiceFetchAction from "../../../public-service/action/fetch-action";
import * as EmployeeFetchAction from "../../../employee/action/fetch-action";

import { Dictionary } from "core/library/dictionary";
import { HasErrors } from "core/component/component";
import { FormInteraction } from "core/library/interaction/form-interaction";
import { FormValidationCombine } from "core/library/extension/validation/validation-combine";
import { QuotationItemHelper } from "../../core/quotation-item-core";
import { initializeQuotationItem } from "../../model/initialization";
import { formatNumberWithCommaSeparator } from "../../../../core/library/data-type";

interface IQuotationItemsState extends IModal {
    QuotationId?: string,
    SelectedIdOnRow?: number
    IsValid?: boolean,
    IsOpenAccessaryForm?: boolean,
    IsOpenServiceForm?: boolean,
    IsOpenEmployeeForm?: boolean,
    IsDisableAccessaryInput?: boolean,
    IsDisableServiceInput?: boolean,
    CurrentItem:{ Target:  IQuotationItem },
    Items?: { Target: Array<IQuotationItem> },
    Accessaries?: Array<Accessary>,
    Services?: Array<Service>,
    Employees?: Array<Employee>,
    Errors?: Dictionary.IKeyedCollection<boolean>
}

class QuotationItemsEdit extends React.Component<any, IQuotationItemsState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private isSelectAccessaryHaveCreatedOrUpdated: boolean;
    private isSelectServiceHaveCreatedOrUpdated: boolean;
    private isSelectEmployeeHaveCreatedOrUpdated: boolean;
    private accessaryIdAfterCreateOrUpdate: string;
    private serviceIdAfterCreateOrUpdate: string;
    private employeeIdAfterCreateOrUpdate: string;
    private maxItemRowsCanAdd: number = 45;
    private readonly itemColumnWidths: Dictionary.IKeyedCollection<{}>;
    private readonly errors: Dictionary.IKeyedCollection<boolean>;
    private readonly inputInteraction: FormInteraction.InputInteraction<IQuotationItem>;
    
    constructor(props: any) {
        super(props);
        this.loadAllQuotationItems = this.loadAllQuotationItems.bind(this);
        this.showCreateAccessaryModal = this.showCreateAccessaryModal.bind(this);
        this.showCreateServiceModal = this.showCreateServiceModal.bind(this);
        this.showCreateEmployeeModal = this.showCreateEmployeeModal.bind(this);
        this.reloadAccessaryAfterCreateOrUpdate = this.reloadAccessaryAfterCreateOrUpdate.bind(this);
        this.reloadServiceAfterCreateOrUpdate = this.reloadServiceAfterCreateOrUpdate.bind(this);
        this.reloadEmployeeAfterCreateOrUpdate = this.reloadEmployeeAfterCreateOrUpdate.bind(this);
        this.closeAccessaryModal = this.closeAccessaryModal.bind(this);
        this.closeServiceModal = this.closeServiceModal.bind(this);
        this.closeEmployeeModal = this.closeEmployeeModal.bind(this);
        this.onChangeAccessaryFilter = this.onChangeAccessaryFilter.bind(this);
        this.onChangeServiceFilter = this.onChangeServiceFilter.bind(this);
        this.onChangeEmployeeFilter = this.onChangeEmployeeFilter.bind(this);
        this.addNewEmptyRow = this.addNewEmptyRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.onSave = this.onSave.bind(this);
        
        this.itemColumnWidths = new Dictionary.KeyedCollection<{}>();
        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<IQuotationItem>();

        this.initializeState();
        this.setInitialErrors(false);
    }   

    setInitialErrors(effectForAllValues: boolean) {
        this.errors.Add("Accessary", effectForAllValues);
        this.errors.Add("Service", effectForAllValues);
        this.errors.Add("Employee", effectForAllValues);
        this.errors.Add("Quantity", effectForAllValues);
        this.errors.Add("Discount", true);
    }
    
    initializeState() {
        this.state = {
            QuotationId: "",
            SelectedIdOnRow: 0,
            IsValid: false,
            IsOpenAccessaryForm: false,
            IsOpenServiceForm: false,
            IsOpenEmployeeForm: false,
            IsDisableAccessaryInput: false,
            IsDisableServiceInput: false,
            CurrentItem: { Target: initializeQuotationItem() },
            Items: { Target: new Array<IQuotationItem>() },
            Accessaries: new Array<Accessary>(),
            Services: new Array<Service>(),
            Employees: new Array<Employee>(),
            Errors: this.errors
        };
    }

    closeAccessaryModal() {
        this.setState({
            Title: "",
            IsOpenAccessaryForm: false
        });
    }
    
    closeServiceModal() {
        this.setState({
            Title: "",
            IsOpenServiceForm: false
        });
    }

    closeEmployeeModal() {
        this.setState({
            Title: "",
            IsOpenEmployeeForm: false
        });
    }

    reloadAccessaryAfterCreateOrUpdate(accessaryId: string) {
        this.props.getAllAccessaries();
        this.isSelectAccessaryHaveCreatedOrUpdated = true;
        this.accessaryIdAfterCreateOrUpdate = accessaryId;
    }

    reloadServiceAfterCreateOrUpdate(serviceId: string) {
        this.props.getAllServices();
        this.isSelectServiceHaveCreatedOrUpdated = true;
        this.serviceIdAfterCreateOrUpdate = serviceId;
    }

    reloadEmployeeAfterCreateOrUpdate(employeeId: string) {
        this.props.getAllEmployees();
        this.isSelectEmployeeHaveCreatedOrUpdated = true;
        this.employeeIdAfterCreateOrUpdate = employeeId;
    }

    showCreateAccessaryModal() {
        this.setState({
            Title: "Thêm phụ tùng mới",
            IsOpenAccessaryForm: true
        });
    }

    showCreateServiceModal() {
        this.setState({
            Title: "Thêm dịch vụ mới",
            IsOpenServiceForm: true
        });
    }

    showCreateEmployeeModal() {
        this.setState({
            Title: "Thêm nhân viên mới",
            IsOpenEmployeeForm: true
        });
    }

    loadAllQuotationItems(quotationId: string = "") {
        this.props.getAllQuotationItems(quotationId != "" ? quotationId : this.props.quotationId);
    }
    
    componentDidMount() {
        this.props.initializeItem();
        this.props.getAllEmployees();
        this.loadAllQuotationItems();
    }
    
    componentWillReceiveProps(nextProps) {
        this.setResultForAccessariesAndServices(nextProps);
        this.setResultForAccessaries(nextProps);
        this.setResultForServices(nextProps);
        this.setResultForEmployees(nextProps);
        this.setResultForAllQuotationItems(nextProps);
    }

    setResultForAccessariesAndServices(nextProps) {
        let newItemResult = nextProps.newItemResult.target;
        if (newItemResult != this.props.newItemResult.target && newItemResult.Success) {
            this.setState({
                Accessaries: this.setResponseStateForAccessaries(newItemResult.Data.Accessaries),
                Services: this.setResponseStateForServices(newItemResult.Data.Services),
            });
        }
    }

    setResponseStateForAccessaries(accessariesResponse: any) {
        let accessaries = new Array<Accessary>();
        if (accessariesResponse)
            accessariesResponse.map((accessary, i) => { accessaries.push(new Accessary (accessary.Id, accessary.Name, accessary.Price, accessary.UnitId, accessary.UnitName)); })
        return accessaries;        
    }
    
    setResponseStateForServices(servicesResponse: any) {
        let services = new Array<Service>();
        if (servicesResponse)
            servicesResponse.map((service, i) => { services.push(new Service(service.Id, service.Name, service.Cost, service.UnitId, service.UnitName)); })
        return services;        
    }

    setResultForAccessaries(nextProps) {
        let allAccessariesResult = nextProps.allAccessariesResult.target;
        if (allAccessariesResult != this.props.allAccessariesResult.target && 
            allAccessariesResult.Success && allAccessariesResult.Data) {
            
            let accessaries = new Array<Accessary>();
            allAccessariesResult.Data.map((accessary, i) => { 
                accessaries.push(new Accessary (accessary.Id, accessary.Name, accessary.Price, accessary.UnitId, accessary.UnitName)); 
            })
            
            this.setState({ Accessaries: accessaries }, 
                () => {
                    if (this.isSelectAccessaryHaveCreatedOrUpdated) {
                        this.onChangeAccessaryFilter(this.accessaryIdAfterCreateOrUpdate);
                        this.isSelectAccessaryHaveCreatedOrUpdated = false;
                        this.accessaryIdAfterCreateOrUpdate = "";
                    }
                });
        }
    }

    setResultForServices(nextProps) {
        let allServicesResult = nextProps.allServicesResult.target;
        if (allServicesResult != this.props.allServicesResult.target && 
            allServicesResult.Success && allServicesResult.Data) {

            let services = new Array<Service>();
            allServicesResult.Data.map((service, i) => { 
                services.push(new Service (service.Id, service.Name, service.Cost, service.UnitId, service.UnitName));
            })

            this.setState({ Services: services }, 
                () => {
                    if (this.isSelectServiceHaveCreatedOrUpdated) {
                        this.onChangeServiceFilter(this.serviceIdAfterCreateOrUpdate);
                        this.isSelectServiceHaveCreatedOrUpdated = false;
                        this.serviceIdAfterCreateOrUpdate = "";
                    }
                });
        }
    }

    setResultForEmployees(nextProps) {
        let allEmployeesResult = nextProps.allEmployeesResult.target;
        if (allEmployeesResult != this.props.allEmployeesResult.target && 
            allEmployeesResult.Success && allEmployeesResult.Data) {
            
            let employees = new Array<Employee>();
            allEmployeesResult.Data.map((employee, i) => { 
                employees.push(new Employee(employee.Id, employee.Name)); 
            })

            this.setState({ Employees: employees }, 
                () => {
                    if (this.isSelectEmployeeHaveCreatedOrUpdated) {
                        this.onChangeEmployeeFilter(this.employeeIdAfterCreateOrUpdate);
                        this.isSelectEmployeeHaveCreatedOrUpdated = false;
                        this.employeeIdAfterCreateOrUpdate = "";
                    }
                });
        }
    }
    
    setResultForAllQuotationItems(nextProps) {
        Loading.showLoading(nextProps.allQuotationItemsResult.loading, "quotation-items");

        let allQuotationItemsResult = nextProps.allQuotationItemsResult.target;
        if (allQuotationItemsResult != this.props.allQuotationItemsResult.target && allQuotationItemsResult.Success) {

            this.state.Items.Target = new Array<IQuotationItem>();
            
            let currentItems: Array<IQuotationItem> = allQuotationItemsResult.Data;
            currentItems.forEach((item: IQuotationItem) => { 
                item.IsEdittingRow = false;
                item.IsDisableAddedRow = true;
            });

            if (!currentItems.some(x => x.Id == 0))
                currentItems.push(initializeQuotationItem());
            
            this.checkQuotationStatusToSetItemColumnsWidth();   

            this.setState({ 
                Items: { Target: currentItems },
                QuotationId: nextProps.quotationId
            });
        }
    }
    
    checkQuotationStatusToSetItemColumnsWidth() {
        let quotationStatus = this.props.quotationStatusId;

        if (quotationStatus == QuotationStatus.RepairCommand || 
            quotationStatus == QuotationStatus.ExportMaterial || quotationStatus == QuotationStatus.Complete)
            QuotationItemHelper.setWidthPercentageForColumnsWithoutPrice(this.itemColumnWidths);
        else
            QuotationItemHelper.setWidthPercentageForAllColumns(this.itemColumnWidths);
    }
    
    onChangeAccessaryFilter(selectedValue: string) {
        let isDisableServiceInput = false;

        if (selectedValue != null) {
            isDisableServiceInput = true;
            let currentAccessary = this.state.Accessaries.filter(x => x.Id == selectedValue)[0];
            this.state.CurrentItem.Target.AccessaryId = selectedValue;
            this.state.CurrentItem.Target.UnitId = currentAccessary.UnitId;
            this.state.CurrentItem.Target.UnitPrice = currentAccessary.Price;
            this.state.CurrentItem.Target.UnitName = currentAccessary.UnitName;
            this.resetServiceValue();
            this.resetEmployeeValue();
            this.resetErrorsWhenSelectAccessaryLookup(true);
        }
        else {
            this.resetAccessaryValue();
            this.resetUnitValueWhenUnSelectLookup();
            this.resetErrorsWhenSelectAccessaryLookup(false);
        }
        this.setStateAndDisableLookupStatusForAccessary(isDisableServiceInput);
    }

    setStateAndDisableLookupStatusForAccessary(isDisableServiceInput: boolean) {
        this.setState({ 
            IsValid: HasErrors(this.state.Errors),
            IsDisableAccessaryInput: false,
            IsDisableServiceInput: isDisableServiceInput,
            CurrentItem: this.state.CurrentItem,
            Errors: this.state.Errors
        });
    }
    
    onChangeServiceFilter(selectedValue: string) {
        let isDisableAccessaryInput = false;

        if (selectedValue != null) {
            isDisableAccessaryInput = true;
            let currentService = this.state.Services.filter(x => x.Id == selectedValue)[0];
            this.state.CurrentItem.Target.ServiceId = selectedValue;
            this.state.CurrentItem.Target.UnitId = currentService.UnitId;
            this.state.CurrentItem.Target.UnitPrice = currentService.Cost;
            this.state.CurrentItem.Target.UnitName = currentService.UnitName;
            this.resetAccessaryValue();
            this.resetErrorsWhenSelectServiceLookup(true);
        }
        else {
            this.resetServiceValue();
            this.resetUnitValueWhenUnSelectLookup();
            this.resetErrorsWhenSelectServiceLookup(false);
        }
        this.setStateAndDisableLookupStatusForServiceEmployee(isDisableAccessaryInput);
    }
    
    onChangeEmployeeFilter(selectedValue: string) {
        let isDisableAccessaryInput = false;

        if (selectedValue != null) {
            isDisableAccessaryInput = true;
            let currentEmployee = this.state.Employees.filter(x => x.Id == selectedValue)[0];
            this.state.CurrentItem.Target.EmployeeId = selectedValue;
            this.state.CurrentItem.Target.EmployeeName = currentEmployee.Name;
            this.resetAccessaryValue();
            this.resetErrorsWhenSelectEmployeeLookup(true);
        }
        else {
            this.resetEmployeeValue();
            this.resetErrorsWhenSelectEmployeeLookup(false);
        }
        this.setStateAndDisableLookupStatusForServiceEmployee(isDisableAccessaryInput);
    }

    setStateAndDisableLookupStatusForServiceEmployee(isDisableAccessaryInput: boolean) {
        this.setState({
            IsValid: HasErrors(this.state.Errors),
            IsDisableAccessaryInput: isDisableAccessaryInput,
            IsDisableServiceInput: false, 
            CurrentItem: this.state.CurrentItem,
            Errors: this.state.Errors 
        });
    }

    resetEmployeeValue() {
        this.state.CurrentItem.Target.EmployeeId = "";
        this.resetQuantityDiscountAndPricesWhenSelectNotCurrentLookup();
    }

    resetServiceValue() {
        this.state.CurrentItem.Target.ServiceId = "";
        this.resetQuantityDiscountAndPricesWhenSelectNotCurrentLookup();
    }

    resetAccessaryValue() {
        this.state.CurrentItem.Target.AccessaryId = "";
        this.resetQuantityDiscountAndPricesWhenSelectNotCurrentLookup();
    }

    resetErrorsWhenSelectAccessaryLookup(valid: boolean) {
        this.state.Errors.SetValue("Accessary", valid);
        this.state.Errors.SetValue("Service", valid);
        this.state.Errors.SetValue("Employee", valid);
    }

    resetErrorsWhenSelectServiceLookup(valid: boolean) {
        this.state.Errors.SetValue("Accessary", valid);
        this.state.Errors.SetValue("Service", valid);
    }

    resetErrorsWhenSelectEmployeeLookup(valid: boolean) {
        this.state.Errors.SetValue("Accessary", valid);
        this.state.Errors.SetValue("Employee", valid);
    }

    resetUnitValueWhenUnSelectLookup() {
        this.state.CurrentItem.Target.UnitId = 0;
        this.state.CurrentItem.Target.UnitPrice = 0;
        this.state.CurrentItem.Target.UnitName = "";
    }

    resetQuantityDiscountAndPricesWhenSelectNotCurrentLookup() {
        this.state.CurrentItem.Target.Quantity = 0;
        this.state.CurrentItem.Target.Discount = 0;
        this.state.CurrentItem.Target.TotalPrice = 0;
        this.state.CurrentItem.Target.FinalPrice = 0;
        this.errors.Add("Quantity", false);
        this.errors.Add("Discount", true);
    }
    
    showLookupAccessariesColumn(item: IQuotationItem) {
        if (this.state.Accessaries) {
            return (
                <div className="row">
                    <div className="col-md-10 padding-right-0">
                        <VirtualizedSelect /*autofocus*/ clearable simpleValue searchable
                            ref="accessarySelect"
                            name="Accessary"
                            labelKey="Name"
                            valueKey="Id"
                            placeholder={"Chọn phụ tùng"} 
                            value={item.AccessaryId}
                            options={this.state.Accessaries}
                            onChange={this.onChangeAccessaryFilter} 
                            disabled={this.state.IsDisableAccessaryInput || item.IsDisableAddedRow} />
                    </div>
                    <div className="col-md-2 padding-left-0 padding-right-0" 
                         style={{
                                cursor: "pointer", paddingTop: 10, 
                                pointerEvents: item.IsEdittingRow && !this.state.IsDisableAccessaryInput ? "auto" : "none"
                            }}>
                        <label className="required text-center" />
                        {
                            this.props.quotationStatusId != QuotationStatus.Complete &&
                            this.props.quotationStatusId != QuotationStatus.CheckUp &&
                            <i title="Thêm phụ tùng mới" className="fa fa-plus-circle" onClick={this.showCreateAccessaryModal}></i>
                        }
                    </div>
                </div>
            )
        }
    }
    
    showLookupServicesColumn(item: IQuotationItem) {
        if (this.state.Services) {
            return (
                <div className="row">
                    <div className="col-md-10 padding-right-0">
                        <VirtualizedSelect clearable simpleValue searchable
                            ref="serviceSelect"
                            name="Service"
                            labelKey="Name"
                            valueKey="Id"
                            placeholder={"Chọn dịch vụ"} 
                            value={item.ServiceId}
                            options={this.state.Services}
                            onChange={this.onChangeServiceFilter} 
                            disabled={this.state.IsDisableServiceInput || item.IsDisableAddedRow} />
                    </div>
                    <div className="col-md-2 padding-left-0 padding-right-0" 
                         style={{
                                    cursor: "pointer", paddingTop: 10, 
                                    pointerEvents: item.IsEdittingRow && !this.state.IsDisableServiceInput ? "auto" : "none"
                                }}>
                        <label className="required text-center" />
                        {
                            this.props.quotationStatusId != QuotationStatus.Complete &&
                            this.props.quotationStatusId != QuotationStatus.CheckUp &&
                            <i title="Thêm dịch vụ mới" className="fa fa-plus-circle" onClick={this.showCreateServiceModal} />
                        }
                    </div>
                </div>
            )
        }
    }

    showLookupEmployeesColumn(item: IQuotationItem) {
        if (this.state.Employees) {
            return (
                <div className="row">
                    <div className="col-md-10 padding-right-0">
                        <VirtualizedSelect clearable simpleValue searchable
                            ref="employeeSelect"
                            name="Employee"
                            labelKey="Name"
                            valueKey="Id"
                            placeholder={"Chọn nhân viên"} 
                            value={item.EmployeeId}
                            options={this.state.Employees}
                            onChange={this.onChangeEmployeeFilter} 
                            disabled={this.state.IsDisableServiceInput || item.IsDisableAddedRow} />
                    </div>
                    <div className="col-md-2 padding-left-0 padding-right-0" 
                         style={{
                                    cursor: "pointer", paddingTop: 10, 
                                    pointerEvents: item.IsEdittingRow && !this.state.IsDisableServiceInput ? "auto" : "none"
                                }}>
                        <label className="required text-center" />
                        {
                            this.props.quotationStatusId != QuotationStatus.Complete &&
                            this.props.quotationStatusId != QuotationStatus.CheckUp &&
                            <i title="Thêm nhân viên mới" className="fa fa-plus-circle" onClick={this.showCreateEmployeeModal} />
                        }
                    </div>
                </div>
            )
        }
    }
    
    setCurrentEditRow(item: IQuotationItem, rowIndex: number, isExistedEdittingRow: boolean) {
        // assign last row as current editting row if none rows is set
        if (item.IsEdittingRow) {
            this.state.CurrentItem.Target = item;
            return;
        }
        if (!isExistedEdittingRow && rowIndex == this.state.Items.Target.length - 1) {
            item.IsEdittingRow = true;
            item.IsDisableAddedRow = false;
            this.state.CurrentItem.Target = item;
        }
    }

    renderLookupColumns(item: IQuotationItem) {
        return (
            <React.Fragment>
                <td style={this.itemColumnWidths.Item("Accessary")}>
                    {this.showLookupAccessariesColumn(item)}
                </td>
                <td style={this.itemColumnWidths.Item("Service")}>
                    {this.showLookupServicesColumn(item)}
                </td>
                <td style={this.itemColumnWidths.Item("Employee")}>
                    {this.showLookupEmployeesColumn(item)}
                </td>
            </React.Fragment>
        )
    }
    
    renderQuantityAndDiscountColumns(item: IQuotationItem) {
        return (
            <React.Fragment>
                <td style={this.itemColumnWidths.Item("Quantity")}>
                    <input type="text" className="form-control" name="Quantity" disabled={item.IsDisableAddedRow}
                           onInput={e => this.inputEvent(e, 
                            (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 3)}
                           value={item.Quantity} style={{width: "95%"}} />
                    <label className="required text-center" style={{width: "5%"}} />
                </td>
                {
                    this.showItemPrices() && 
                    <td style={this.itemColumnWidths.Item("Discount")}>
                        <input type="text" className="form-control" name="Discount" disabled={item.IsDisableAddedRow}
                            onInput={e => this.inputEvent(e, 
                                (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 3)}
                            value={item.Discount} style={{width: "100%"}} />
                    </td>
                }
            </React.Fragment>
        )
    }
    
    renderItems() {
        let isExistedEdittingRow = this.state.Items.Target.some(x => x.IsEdittingRow);
        return (
            this.state.Items.Target.map((item, index) => {
                this.setCurrentEditRow(item, index, isExistedEdittingRow);
                
                if (index < this.maxItemRowsCanAdd) {
                    return (
                        <tr className="gradeA odd" role="row" key={index}>
                            {this.renderLookupColumns(item)}

                            <td style={this.itemColumnWidths.Item("UnitName")}>
                                {item.UnitName}
                                <input type="hidden" name="UnitId" className="form-control" value={item.UnitId} />
                                <input type="hidden" name="IsEdittingRow" className="form-control" value={item.IsEdittingRow.toString()} />
                                <input type="hidden" name="IsDisableAddedRow" className="form-control" value={item.IsDisableAddedRow.toString()} />
                            </td>
                            <td  style={this.itemColumnWidths.Item("EmployeeName")}>
                                {item.EmployeeName}
                            </td>
                            {this.showItemPrices() && <td style={this.itemColumnWidths.Item("UnitPrice")}>
                                {formatNumberWithCommaSeparator(item.UnitPrice)}
                            </td>}
                            
                            {this.renderQuantityAndDiscountColumns(item)}

                            {this.showItemPrices() && <td style={this.itemColumnWidths.Item("TotalPrice")}>
                                {formatNumberWithCommaSeparator(item.TotalPrice)}
                            </td>}
                            {this.showItemPrices() && <td style={this.itemColumnWidths.Item("FinalPrice")}>
                                {formatNumberWithCommaSeparator(item.FinalPrice)}
                            </td>}
                            {
                                this.props.quotationStatusId != QuotationStatus.Complete &&
                                this.props.quotationStatusId != QuotationStatus.CheckUp &&
                                this.renderAddEditDeleteButtonColumn(item, index)
                            }
                        </tr>
                    )
                }
            })
        )
    }

    renderAddEditDeleteButtonColumn(item: IQuotationItem, rowIndex: number) {
        return (
            <td className="text-center" style={this.itemColumnWidths.Item("Action")}>
                <table style={{marginTop: 10, width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <a href="javascript:void(0);" onClick={() => this.addNewEmptyRow()} style={this.disableModifyingRowOrAddingNewRowButton()}>
                                    <i className="fa fa-plus-circle text-navy" aria-hidden="true" title="Thêm" />
                                </a>
                            </td>
                            {this.renderEditButton(item, rowIndex)}
                            <td>
                                <a href="javascript:void(0);" onClick={() => this.removeRow(rowIndex)} style={this.disableRemoveRowButtonWhenItemsHaveAtLeastOneRow()}>
                                    <i className="fa fa-times text-navy" aria-hidden="true" title="Xóa" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        )
    }

    renderEditButton(item: IQuotationItem, rowIndex: number) {
        if (item.IsEdittingRow && rowIndex < this.state.Items.Target.length - 1) {
            return (
                <td>
                    <a href="javascript:void(0);" onClick={(e) => this.onSave(e)} style={this.disableModifyingRowOrAddingNewRowButton()}>
                        <i className="fa fa-save text-navy" aria-hidden="true" title="Lưu" />
                    </a>
                </td>
            )
        }
        else {
            return (
                <td>
                    <a href="javascript:void(0);" onClick={() => this.editRow(rowIndex)} style={this.disableEditRowButtonWhenItemRowIsNotCurrentItemAndHaveValues(item)}>
                        <i className="fa fa-pencil text-navy" aria-hidden="true" title="Sửa" />
                    </a>
                </td>
            )
        }
    }

    removeRow(deleteRowIndex: number) {
        let modifiedItems = this.state.Items.Target.filter((item, itemIndex) => itemIndex != deleteRowIndex);
        // set valid is true on previous item
        this.setInitialErrors(true);
        this.setState({
            IsValid: true, 
            CurrentItem: { Target: modifiedItems[modifiedItems.length - 1] },
            Items: { Target: modifiedItems },
            Errors: this.errors
        });
    }
    
    editRow(editRowIndex: number) {
        this.setEdittingStatusOnLastRowOrModifyingRow(editRowIndex);
        this.setInitialErrors(true);
        this.setState({ IsValid: true, Items: this.state.Items });
    }

    addNewEmptyRow() {
        if (this.state.IsValid) {
            let newItem = initializeQuotationItem();
            
            this.setInitialErrors(false);
            this.state.CurrentItem.Target.IsEdittingRow = false;
            this.state.CurrentItem.Target.IsDisableAddedRow = true;
            this.state.Items.Target.push(newItem);

            this.setState({
                IsValid: false,
                IsDisableAccessaryInput: false,
                IsDisableServiceInput: false, 
                CurrentItem: { Target: newItem },
                Items: this.state.Items,
                Errors: this.state.Errors
            });
        }
    }
    
    onSave(event: any) {
        if (this.state.IsValid) {
            this.setEdittingStatusOnLastRowOrModifyingRow();
            this.setState({
                IsValid: false,
                IsDisableAccessaryInput: false,
                IsDisableServiceInput: false, 
                CurrentItem: this.state.CurrentItem,
                Items: this.state.Items,
                Errors: this.state.Errors
            });
        }
    }
    
    setEdittingStatusOnLastRowOrModifyingRow(editRowIndex: number = -1) {
        let itemsCount = this.state.Items.Target.length - 1;

        this.state.Items.Target.forEach(function(item: IQuotationItem, index: number) {
            if ((editRowIndex > -1 && index == editRowIndex) || (editRowIndex == -1 && index == itemsCount)) {
                item.IsEdittingRow = true;
                item.IsDisableAddedRow = false;
            }
            else {
                item.IsEdittingRow = false;
                item.IsDisableAddedRow = true;
            }
        });
    }

    disableModifyingRowOrAddingNewRowButton() {
        let disableAddingStyles = { pointerEvents: this.state.IsValid ? "auto" : "none" };
        return disableAddingStyles;
    }

    disableEditRowButtonWhenItemRowIsNotCurrentItemAndHaveValues(item: IQuotationItem) {
        let disableEdittingStyles = { pointerEvents: !item.IsEdittingRow ? "auto" : "none" };
        return disableEdittingStyles;
    }
    
    disableRemoveRowButtonWhenItemsHaveAtLeastOneRow() {
        let disableRemoveStyles = { pointerEvents: this.state.Items.Target.length > 1 ? "auto" : "none" };
        return disableRemoveStyles;
    }

    checkValidOnEveryChange(name: string, valid: boolean) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: HasErrors(this.state.Errors)});
    }

    validateInputNumberAndMaxLength = (name: string, value: any, required: boolean, valueCompare: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
        this.checkValidOnEveryChange(name, isValid);
    }

    inputEvent = (event: any, validation?: (name: string, value: any, required: boolean, valueCompare: any) => void,
        required?: boolean, valueToCompare?: any) => {

        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
        
        if (name == "Quantity")
           this.setFinalPriceBaseOnQuantity(value);
        if (name == "Discount")
            this.setFinalPriceBaseOnDiscount(value);
        
        this.setState({ CurrentItem: { Target: this.inputInteraction.onReceiveTarget(event.target, this.state.CurrentItem.Target) }}, doValidation);
    }

    setFinalPriceBaseOnQuantity(elementValue: any) {
        let currentItemSetting: IQuotationItem = this.state.CurrentItem.Target;
        
        currentItemSetting.Quantity = elementValue;
        if (!isNaN(elementValue))
            currentItemSetting.FinalPrice = currentItemSetting.TotalPrice = elementValue * currentItemSetting.UnitPrice;

        this.state.CurrentItem.Target = currentItemSetting;
    }

    setFinalPriceBaseOnDiscount(elementValue: any) {
        let currentItemSetting: IQuotationItem = this.state.CurrentItem.Target;

        currentItemSetting.Discount = elementValue;
        if (!isNaN(elementValue)) {
            let totalPrice = currentItemSetting.Quantity * currentItemSetting.UnitPrice;
            currentItemSetting.FinalPrice = totalPrice - (totalPrice * elementValue) / 100;
        }

        this.state.CurrentItem.Target = currentItemSetting;
    }
    
    showItemPrices() {
        let quotationStatus = this.props.quotationStatusId;

        if (quotationStatus == QuotationStatus.RepairCommand || 
            quotationStatus == QuotationStatus.ExportMaterial ||  
            quotationStatus == QuotationStatus.Complete) {
            return false;
        }
        return true;
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Phụ tùng / Công dịch vụ</h5>
                                <div className="ibox-tools">
                                    <a className="collapse-link binded">
                                        <i className="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ibox-content" id="quotation-items">
                                <Loading.loadingIcon container="quotation-items" />

                                <div className="table-responsive" style={{height: "500px"}}>
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                        <table id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid"
                                            className="table table-striped table-bordered table-hover dataTables-example dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th>DM Phụ tùng</th>
                                                    <th>DM Công dịch vụ</th>
                                                    <th>DM Nhân viên</th>
                                                    <th>ĐVT</th>
                                                    <th>Nhân viên</th>
                                                    {this.showItemPrices() && <th>Giá</th>}
                                                    <th>Số lượng</th>
                                                    {this.showItemPrices() && <th>Giảm giá <small>(%)</small></th>}
                                                    {this.showItemPrices() && <th>Đơn giá</th>}
                                                    {this.showItemPrices() && <th>Thành tiền</th>}
                                                    {
                                                        this.props.quotationStatusId != QuotationStatus.Complete &&
                                                        this.props.quotationStatusId != QuotationStatus.CheckUp &&
                                                        <th></th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderItems()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenAccessaryForm} close={this.closeAccessaryModal}>
                    <AccessaryForm closeModal={this.closeAccessaryModal} reloadAccessaries={this.reloadAccessaryAfterCreateOrUpdate} />
                </GeneralModal>

                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenEmployeeForm} close={this.closeEmployeeModal}>
                    <EmployeeForm closeModal={this.closeEmployeeModal} reloadEmployees={this.reloadEmployeeAfterCreateOrUpdate} />
                </GeneralModal>

                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenServiceForm} close={this.closeServiceModal}>
                    <PublicServivceForm closeModal={this.closeServiceModal} reloadServices={this.reloadServiceAfterCreateOrUpdate} />
                </GeneralModal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        quotationId: ownProps.quotationId,
        quotationStatusId: ownProps.quotationStatusId,
        allAccessariesResult: state.AllAccessariesReducer,
        allServicesResult: state.AllPublicServReducer,
        allEmployeesResult: state.AllEmployeesReducer,
        allQuotationItemsResult: state.AllQuotationItemsReducer,
        newItemResult: state.NewQuotationItemReducer
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    let allAccessariesAction = new AccessaryFetchAction.AllAccessariesAction();
    let allServicesAction = new ServiceFetchAction.AllPublicServAction();
    let allEmployeesAction = new EmployeeFetchAction.AllEmployeesAction();
    let allQuotationItemsAction = new FetchAction.AllQuotationItemsAction();
    let newQuotationItemAction = new FetchAction.NewQuotationItemAction();

    return {
        getAllServices: () => dispatch(allServicesAction.fetch()),
        getAllAccessaries: () => dispatch(allAccessariesAction.fetch()),
        getAllEmployees: () => dispatch(allEmployeesAction.fetch()),
        getAllQuotationItems: (quotationId?: string) => dispatch(allQuotationItemsAction.fetch(quotationId)),
        initializeItem: () => dispatch(newQuotationItemAction.fetch(null))
    }
}

const connectedQuotationItemsEdit = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(QuotationItemsEdit);
export { connectedQuotationItemsEdit as QuotationItemsEdit };
