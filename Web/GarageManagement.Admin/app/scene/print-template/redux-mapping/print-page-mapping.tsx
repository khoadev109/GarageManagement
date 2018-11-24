import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    addOrUpdateTemplateResult: any;
    getPrintTemplateByStatusResult: any;
}

export interface IFormDispatchProps {
    getTemplateByStatus(entry: any): any;
    addOrUpdateTemplateAction(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class PrintPageMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            addOrUpdateTemplateResult: state.AddOrUpdatePrintTemplateReducer,
            getPrintTemplateByStatusResult: state.GetPrintTemplateByStatusReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        let getTemplateByStatusAction = new FetchAction.PrintTemplateAction();
        let addOrUpdateTemplateAction = new PostAction.AddOrUpdatePrintTemplateAction();

        return {
            getTemplateByStatus: (entry: any) => dispatch(getTemplateByStatusAction.fetch(entry)),
            addOrUpdateTemplateAction: (entry: any) => dispatch(addOrUpdateTemplateAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
