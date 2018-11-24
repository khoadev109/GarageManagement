import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    customerTypeResult: any,
    customerTypeEditResult: any,
    customerTypeCreateResult: any   
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadCustomerTypes: any;
    getCustomerType(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class CustomerTypeFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            customerTypeResult: state.CustomerTypeReducer,
            customerTypeEditResult: state.CustomerTypeEditReducer,
            customerTypeCreateResult: state.CustomerTypeCreateReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const customerTypeAction = new FetchAction.CustomerTypeAction();
        const customerTypeEditAction = new PostAction.CustomerTypeEditAction();
        const customerTypeCreateAction = new PostAction.CustomerTypeEditAction();

        return {
            closeModal: ownProps.closeModal,
            reloadCustomerTypes: ownProps.reloadCustomerTypes,
            getCustomerType: () => dispatch(customerTypeAction.fetch(ownProps.customerTypeId)),
            create: (entry: any) => dispatch(customerTypeCreateAction.post(entry)),
            edit: (entry: any) => dispatch(customerTypeEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
