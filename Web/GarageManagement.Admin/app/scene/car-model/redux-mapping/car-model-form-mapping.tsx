import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    carModelResult: any;
    carModelEditResult: any;
    carModelCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadCarModels: any;
    getCarModel(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class CarModelFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            carModelResult: state.CarModelReducer,
            carModelEditResult: state.CarModelEditReducer,
            carModelCreateResult: state.CarModelCreateReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const carModelAction = new FetchAction.CarModelAction();
        const carModelEditAction = new PostAction.CarModelEditAction();
        const carModelCreateAction = new PostAction.CarModelCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadCarModels: ownProps.reloadCarModels,
            getCarModel: () => dispatch(carModelAction.fetch(ownProps.carModelId)),
            edit: (entry: any) => dispatch(carModelEditAction.post(entry)),
            create: (entry: any) => dispatch(carModelCreateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
