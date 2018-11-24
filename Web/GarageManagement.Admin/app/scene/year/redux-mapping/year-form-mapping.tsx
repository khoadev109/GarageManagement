import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    yearResult: any;
    yearEditResult: any;
    yearCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadYears: any;
    getYear(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class YearFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            yearResult: state.YearReducer,
            yearEditResult: state.YearEditReducer,
            yearCreateResult: state.YearCreateReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const yearAction = new FetchAction.YearAction();
        const yearEditAction = new PostAction.YearEditAction();
        const yearCreateAction = new PostAction.YearCreateAction();

        return {
            closeModal: ownProps.closeModal,
            reloadYears: ownProps.reloadYears,
            getYear: () => dispatch(yearAction.fetch(ownProps.yearId)),
            edit: (entry: any) => dispatch(yearEditAction.post(entry)),
            create: (entry: any) => dispatch(yearCreateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
