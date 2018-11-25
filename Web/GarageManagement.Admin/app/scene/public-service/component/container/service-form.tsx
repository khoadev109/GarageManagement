// import React from "react";
// import { IFormProps, CombinedProps, ServiceFormMapping } from "../../redux-mapping/service-form-mapping"
// import { CheckboxWithLabelHorizontal } from "component/control/checkbox-component";
// import { TextboxWithLabelHorizontal } from "component/control/textbox-component";
// import { TextareaWithLabelHorizontal } from "component/control/textarea-component";
// import { SelectWithLabelHorizontal } from "component/control/select-component";
// import { SubmitCenter } from "component/control/submit-component";
// import { Hr } from "component/common/common-component";
// import { GeneralFormComponent } from "core/component/base-form-component";
// import StateResponse from "../../state/response-state-handler";

// interface FormState {
//     IsValid?: boolean,
//     LoadSucceed: boolean,
//     PublicService: IPublicService,
//     Branches: Array<GeneralState.Branch>,
//     ServiceTypes: Array<GeneralState.ServiceType>,
//     ServiceUnits: Array<GeneralState.ServiceUnit>,
//     Errors: Dictionary.IKeyedCollection<boolean>
// }

// class PublicServForm extends GeneralFormComponent<CombinedProps, FormState, IPublicService> {

//     setInitialErrors(effectForAllValues?: boolean) {
//         this.errors.add("Name", effectForAllValues);
//         this.errors.add("Cost", effectForAllValues);
//         this.errors.add("UnitId", effectForAllValues);
//         this.errors.add("BranchId", effectForAllValues);
//         this.errors.add("ServiceTypeId", effectForAllValues);
//     }

//     initState() {
//         this.state = {
//             IsValid: false,
//             LoadSucceed: false,
//             PublicService: {
//                 Id: "",
//                 GenerateId: 0,
//                 Name: "",
//                 Cost: 0,
//                 Description: "",
//                 ServiceTypeId: 0,
//                 ServiceTypeName: "",
//                 UnitId: 0,
//                 UnitName: "",
//                 BranchId: 0,
//                 BranchName: "",
//                 IsInputServiceId: false
//             },
//             Branches: new Array<GeneralState.Branch>(),
//             ServiceUnits: new Array<GeneralState.ServiceUnit>(),
//             ServiceTypes: new Array<GeneralState.ServiceType>(),
//             Errors: this.errors
//         }
//     }

//     onSave(event: any) {
//         this.onCreateOrUpdate<IPublicService>(event, this.state.PublicService.GenerateId, this.state.PublicService);
//     }

//     reloadServices(serviceId?: string) {
//         if (this.props.reloadServices)
//             this.props.reloadServices(serviceId);
//     }

//     componentDidMount() {
//         this.props.getService();
//     }

//     componentWillReceiveProps(nextProps) {
//         this.handleResponseFromServerForCreateAction(this.props.serviceCreateResult.target, nextProps.serviceCreateResult.target);
//         this.handleResponseFromServerForEditAction(this.props.serviceEditResult.target, nextProps.serviceEditResult.target);
//         this.setDetailServiceResponseFromServer(nextProps);
//     }

//     setDetailServiceResponseFromServer(nextProps: IFormProps) {
//         const newResult = nextProps.serviceResult.target;
//         const isChanged = this.isPropsChanged(this.props.serviceResult.target, newResult);
        
//         if (isChanged && newResult.Success) {
//             StateResponse.setDetailServiceResponse(
//                 newResult.Data, 
//                 () => {
//                     if (this.state.PublicService.GenerateId > 0) {
//                         this.setState({ IsValid: true });
//                         this.setInitialErrors(true);
//                     }
//                 });
//         }
//     }

//     renderBranches() {
//         if (this.state.LoadSucceed) {
//             return (
//                 this.state.Branches.length ?
//                     this.state.Branches.map((branch, i) => {
//                         return (
//                             <option value={branch.Id} key={branch.Id} data-short-name={branch.ShortName}>
//                                 {branch.Name}
//                             </option>
//                         )
//                     }) : null
//             )
//         }
//     }

//     renderServiceUnits() {
//         if (this.state.LoadSucceed) {
//             return (
//                 this.state.ServiceUnits.length ?
//                     this.state.ServiceUnits.map((serviceUnit, i) => {
//                         return (
//                             <option value={serviceUnit.Id} key={serviceUnit.Id}>
//                                 {serviceUnit.Name}
//                             </option>
//                         )
//                     }) : null
//             )
//         }
//     }

//     renderServiceTypes() {
//         if (this.state.LoadSucceed) {
//             return (
//                 this.state.ServiceTypes.length ?
//                     this.state.ServiceTypes.map((serviceType, i) => {
//                         return (
//                             <option value={serviceType.Id} key={serviceType.Id}>
//                                 {serviceType.Name}
//                             </option>
//                         )
//                     }) : null
//             )
//         }
//     }

//     inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
//         this.setState({ 
//             PublicService: this.inputInteraction.onBindTarget(event.target, this.state.PublicService) 
//         }, 
//         this.triggerValidation(event, validationFunc, required, valueToCompare));
//     }

//     selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
//         this.setServiceIdBaseOnSelectedBranch(event.target);

//         this.setState({
//             PublicService: this.selectInteraction.onBindTarget(event.target, this.state.PublicService) 
//         }, 
//         this.triggerValidation(event, validationFunc, required, valueToCompare));
//     }

//     setServiceIdBaseOnSelectedBranch(target: any) {
//         if (!this.state.PublicService.IsInputServiceId && name == "BranchId") {
//             const serviceIdSegments = this.state.PublicService.Id.split("-");
//             if (serviceIdSegments[0] != "") {
//                 serviceIdSegments[0] = "";
//                 this.state.PublicService.Id = serviceIdSegments.join("-");
//             }

//             var shortName = target.options[target.selectedIndex].dataset.shortName;
//             this.state.PublicService.Id = shortName.concat(this.state.PublicService.Id);
//         }
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="ibox-content">
//                     <form method="post" className="form-horizontal" onSubmit={this.onSave}>

//                         <TextboxWithLabelHorizontal name="Id" labelText="Mã dịch vụ" 
//                                                         disabled={!this.state.PublicService.IsInputServiceId}
//                                                         value={this.state.PublicService.Id}
//                                                         event={this.inputEvent.bind(this)} />

//                         <Hr />
//                         <SelectWithLabelHorizontal  name="UnitId" labelText="Đơn vị" 
//                                                     value={this.state.PublicService.UnitId}
//                                                     loadDataFunc={this.renderServiceUnits} 
//                                                     event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
//                         <Hr />
//                         <SelectWithLabelHorizontal  name="ServiceTypeId" labelText="Loại dịch vụ" 
//                                                     value={this.state.PublicService.ServiceTypeId}
//                                                     loadDataFunc={this.renderServiceTypes} 
//                                                     event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />

//                         <Hr />
//                         <TextboxWithLabelHorizontal name="Name" labelText="Tên dịch vụ" 
//                                                         value={this.state.PublicService.Name} isRequired={true}
//                                                         event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
//                         <Hr />
//                         <TextboxWithLabelHorizontal name="Cost" labelText="Giá dịch vụ" 
//                                                         value={this.state.PublicService.Name} isRequired={true}
//                                                         event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), true, 8)} />
//                         <Hr />
//                         <TextareaWithLabelHorizontal name="Description" labelText="Mô tả" 
//                                                         value={this.state.PublicService.Description}
//                                                         event={this.inputEvent.bind(this)} />
//                         <Hr />
//                         <SubmitCenter disabled={!this.state.IsValid} />

//                     </form>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }

// const connectedComponent = new ServiceFormMapping().connectComponent(PublicServForm);
// export { connectedComponent as PublicServivceForm };
