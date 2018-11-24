import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as LocaleAction from "../../../core/locale/action/fetch-action";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface PagingProps {
    deleteResult: any;
    customersPagingResult: any;
    specifyCustomerResult: any;
}

export interface PagingDispatchProps {
    loadPagingData(entry: any): any;
    delete(entry: any): any;
    customerCar(entry: any): any;
}

export interface CombinedProps extends PagingProps, PagingDispatchProps { }

export class CustomerPagingMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : PagingProps {
        return {
            deleteResult: state.CustomerDeleteReducer,
            customersPagingResult: state.CustomersWithPagingReducer,
            specifyCustomerResult: state.SpecifyCustomerCarReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : PagingDispatchProps {
        const customerAction = new FetchAction.CustomerAction();
        const pagingAction = new FetchAction.CustomersPagingAction();
        const deleteAction = new PostAction.CustomerDeleteAction();

        return {
            loadPagingData: (entry: any) => dispatch(pagingAction.fetch(entry)),
            delete: (entry: any) => dispatch(deleteAction.post(entry)),
            customerCar: (entry: any) => dispatch(customerAction.fetch(entry))
        }
    }
    
    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
