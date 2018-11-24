import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    garageResult: any;
    garageUpdateResult: any;
}

export interface IFormDispatchProps {
    get(entry?: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class GarageFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            garageResult: state.GarageInformationReducer,
            garageUpdateResult: state.GarageUpdateReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const garageInfoAction = new FetchAction.GarageInformationAction();
        const garateUpdateAction = new PostAction.GarageUpdateAction();

        return {
            get: (entry: any) => dispatch(garageInfoAction.fetch(entry)),
            edit: (entry: any) => dispatch(garateUpdateAction.post(entry)),
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
