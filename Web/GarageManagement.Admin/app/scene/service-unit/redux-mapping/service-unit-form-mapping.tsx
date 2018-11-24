import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    serviceUnitResult: any;
    serviceUnitEditResult: any;
    serviceUnitCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadServiceUnits: any;
    getServiceUnit(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class ServiceUnitFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            serviceUnitResult: state.ServiceUnitReducer,
            serviceUnitEditResult: state.ServiceUnitEditReducer,
            serviceUnitCreateResult: state.ServiceUnitCreateReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const serviceUnitAction = new FetchAction.ServiceUnitAction();
        const serviceUnitEditAction = new PostAction.ServiceUnitEditAction();
        const serviceUnitCreateAction = new PostAction.ServiceUnitCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadServiceUnits: ownProps.reloadServiceUnits,
            getServiceUnit: () => dispatch(serviceUnitAction.fetch(ownProps.serviceUnitId)),
            create: (entry: any) => dispatch(serviceUnitCreateAction.post(entry)),
            edit: (entry: any) => dispatch(serviceUnitEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
