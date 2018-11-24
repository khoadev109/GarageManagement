import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as FetchAction from "../action/fetch-action";
import * as PostAction from "../action/post-action";

export interface PagingProps {
    deleteResult: any;
    pagingResult: any;
}

export interface PagingDispatchProps {
    loadPagingData(entry: any): any;
    deleteCategory(entry: any): any;
}

export interface CombinedProps extends PagingProps, PagingDispatchProps { }

export class CategoryPagingMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : PagingProps {
        return {
            deleteResult: state.CategoryDeleteReducer,
            pagingResult: state.CategoriesWithPagingReducer
        }
    }

    mapDispatchToProps(dispatch: any, ownProps?: any) : PagingDispatchProps {
        const pagingAction = new FetchAction.CategoriesPagingAction();
        const deleteAction = new PostAction.CategoryDeleteAction();

        return {
            loadPagingData: (entry: any) => dispatch(pagingAction.fetch(entry)),
            deleteCategory: (entry: any) => dispatch(deleteAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
