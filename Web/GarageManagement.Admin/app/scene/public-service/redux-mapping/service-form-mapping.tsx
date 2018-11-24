import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    serviceResult: any;
    serviceEditResult: any;
    serviceCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadServices: any;
    getService(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class ServiceFormMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            serviceResult: state.PublicServReducer,
            serviceEditResult: state.PublicServEditReducer,
            serviceCreateResult: state.PublicServCreateReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        let serviceAction = new FetchAction.PublicServAction();
        let serviceEditAction = new PostAction.PublicServEditAction();
        let serviceCreateAction = new PostAction.PublicServCreateAction();
    
        return {
            closeModal: ownProps.closeModal,
            reloadServices: ownProps.reloadServices,
            getService: () => dispatch(serviceAction.fetch(ownProps.serviceId)),
            edit: (entry: any) => dispatch(serviceEditAction.post(entry)),
            create: (entry: any) => dispatch(serviceCreateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}