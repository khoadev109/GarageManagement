import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    categoryId: number;
    categoryResult: any;
    parentCategoriesResult: any;
    categoryEditResult: any;
    categoryCreateResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadCategories: any;
    getCategory(): any;
    getParentCategories(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class CategoryFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            categoryId: ownProps.categoryId,
            categoryResult: state.CategoryReducer,
            parentCategoriesResult: state.ParentCategoriesReducer,
            categoryEditResult: state.CategoryEditReducer,
            categoryCreateResult: state.CategoryCreateReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const categoryAction = new FetchAction.CategoryAction();
        const parentCategoriesAction = new FetchAction.ParentCategoriesAction();
        const categoryEditAction = new PostAction.CategoryEditAction();
        const categoryCreateAction = new PostAction.CategoryCreateAction();
    
        return {
            closeModal: ownProps.closeModal,
            reloadCategories: ownProps.reloadCategories,
            getCategory: () => dispatch(categoryAction.fetch(ownProps.categoryId)),
            getParentCategories: () => dispatch(parentCategoriesAction.fetch()),
            create: (entry: any) => dispatch(categoryCreateAction.post(entry)),
            edit: (entry: any) => dispatch(categoryEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
