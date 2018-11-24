import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    manufacturerResult: any,
    manufacturerEditResult: any,
    manufacturerCreateResult: any
}

export interface IFormDispatchProps {
    closeModal: any,
    reloadManufacturers: any,
    getManufacturer: () => any,
    edit: (entry: any) => any,
    create: (entry: any) => any
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class ManufacturerFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            manufacturerResult: state.ManufacturerReducer,
            manufacturerEditResult: state.ManufacturerEditReducer,
            manufacturerCreateResult: state.ManufacturerCreateReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const manufacturerAction = new FetchAction.ManufacturerAction();
        const manufacturerEditAction = new PostAction.ManufacturerEditAction();
        const manufacturerCreateAction = new PostAction.ManufacturerCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadManufacturers: ownProps.reloadManufacturers,
            getManufacturer: () => dispatch(manufacturerAction.fetch(ownProps.manufacturerId)),
            edit: (entry: any) => dispatch(manufacturerEditAction.post(entry)),
            create: (entry: any) => dispatch(manufacturerCreateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
