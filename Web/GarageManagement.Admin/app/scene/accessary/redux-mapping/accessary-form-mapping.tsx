import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    accessaryResult: any;
    accessaryEditResult: any;
    accessaryCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadAccessaries: any;
    getAccessary(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class AccessaryFormMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            accessaryResult: state.AccessaryReducer,
            accessaryEditResult: state.AccessaryEditReducer,
            accessaryCreateResult: state.AccessaryCreateReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const accessaryAction = new FetchAction.AccessaryAction();
        const accessaryEditAction = new PostAction.AccessaryEditAction();
        const accessaryCreateAction = new PostAction.AccessaryCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadAccessaries: ownProps.reloadAccessaries,
            getAccessary: () => dispatch(accessaryAction.fetch(ownProps.accessaryId)),
            edit: (entry: any) => dispatch(accessaryEditAction.post(entry)),
            create: (entry: any) => dispatch(accessaryCreateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
