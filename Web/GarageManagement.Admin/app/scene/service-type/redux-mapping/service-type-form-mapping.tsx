import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    serviceTypeResult: any,
    parentServiceTypeResult: any,
    serviceTypeEditResult: any,
    serviceTypeCreateResult: any
}

export interface IFormDispatchProps {
    closeModal: any,
    reloadServiceTypes: any,
    getServiceType(): any,
    getParentServiceTypes(): any,
    create(entry: any): any,
    edit(entry: any): any
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class ServiceTypeFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            serviceTypeResult: state.ServiceTypeReducer,
            parentServiceTypeResult: state.ParentServiceTypesReducer,
            serviceTypeEditResult: state.ServiceTypeEditReducer,
            serviceTypeCreateResult: state.ServiceTypeCreateReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const serviceTypeAction = new FetchAction.ServiceTypeAction();
        const parentServiceTypeAction = new FetchAction.ParentServiceTypesAction();
        const serviceTypeEditAction = new PostAction.ServiceTypeEditAction();
        const serviceTypeCreateAction = new PostAction.ServiceTypeCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadServiceTypes: ownProps.reloadServiceTypes,
            getServiceType: () => dispatch(serviceTypeAction.fetch(ownProps.serviceTypeId)),
            getParentServiceTypes: () => dispatch(parentServiceTypeAction.fetch(null)),
            create: (entry: any) => dispatch(serviceTypeCreateAction.post(entry)),
            edit: (entry: any) => dispatch(serviceTypeEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
