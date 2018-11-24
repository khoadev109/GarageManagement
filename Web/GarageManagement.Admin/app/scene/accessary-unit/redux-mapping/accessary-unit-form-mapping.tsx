import { connect } from "react-redux";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";
import { ReduxMapping } from "../../../core/redux/mapping";

export interface IFormProps {
    accessaryUnitResult: any;
    accessaryUnitEditResult: any;
    accessaryUnitCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadAccessaryUnits: any;
    getAccessaryUnit: any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class AccessaryUnitFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            accessaryUnitResult: state.AccessaryUnitReducer,
            accessaryUnitEditResult: state.AccessaryUnitEditReducer,
            accessaryUnitCreateResult: state.AccessaryUnitCreateReducer     
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const accessaryUnitAction = new FetchAction.AccessaryUnitAction();
        const accessaryUnitEditAction = new PostAction.AccessaryUnitEditAction();
        const accessaryUnitCreateAction = new PostAction.AccessaryUnitCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadAccessaryUnits: ownProps.reloadAccessaryUnits,
            getAccessaryUnit: () => dispatch(accessaryUnitAction.fetch(ownProps.accessaryUnitId)),
            create: (entry: any) => dispatch(accessaryUnitCreateAction.post(entry)),
            edit: (entry: any) => dispatch(accessaryUnitEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
