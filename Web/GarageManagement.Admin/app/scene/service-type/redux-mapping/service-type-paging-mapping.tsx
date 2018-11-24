import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface PagingProps {
    deleteResult: any;
    pagingResult: any;
}

export interface PagingDispatchProps {
    loadPaging(entry: any): any;
    delete(entry: any): any;
}

export interface CombinedProps extends PagingProps, PagingDispatchProps { }

export class ServiceTypePagingMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : PagingProps {
        return {
            deleteResult: state.ServiceTypeDeleteReducer,
            pagingResult: state.ServiceTypeWithPagingReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : PagingDispatchProps {
        const pagingAction = new FetchAction.ServiceTypePagingAction();
        const deleteAction = new PostAction.ServiceTypeDeleteAction();

        return {
            loadPaging: (entry: any) => dispatch(pagingAction.fetch(entry)),
            delete: (entry: any) => dispatch(deleteAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
