import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import { IQuotation } from "../state/quotation-info-state";
import { IQuotationItem } from "../state/quotation-item-state";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";
import * as CarFetchAction from "../../car/action/fetch-action";

export interface ComponentProps {
    quotationId: any, 
    quotationStatusId: any,
    quotationResult: any,
    specifyQuotationNoteResult: any,
    pendingQuotationsResult: any,
    updateQuotationResult: any,
    updateQuotationItemsResult: any,
    changeQuotationsStatusResult: any,
    quotationNoteUpdateSpecifyStepResult: any
}

export interface ComponentDispatchProps {
    getQuotation(entry: any): any,
    getQuotationNote(quotationId: string, statusId: number): any, 
    getPendingQuotations(statusId: number, searchTerm: string): any,
    updateNote(request): any,
    changeQuotationStatus(request): any,
    updateQuotationItems(quotationId: string, items: Array<IQuotationItem>): any,
    updateQuotationInfo(quotationId: string, quotation: IQuotation): any
}

export interface CombinedProps extends ComponentProps, ComponentDispatchProps { }

export class MainQuotationMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : ComponentProps {
        return {
            quotationId: ownProps.match.params.quotationId, 
            quotationStatusId: ownProps.match.params.statusId,
            quotationResult: state.QuotationReducer,
            specifyQuotationNoteResult: state.SpecifyQuotationNoteReducer,
            pendingQuotationsResult: state.PendingQuotationsReducer,
            updateQuotationResult: state.QuotationEditReducer,
            updateQuotationItemsResult: state.QuotationItemsUpdateReducer,
            changeQuotationsStatusResult: state.QuotationChangeStatusReducer,
            quotationNoteUpdateSpecifyStepResult: state.QuotationNoteUpdateSpecifyStepReducer
        }
    }
    
    mapDispatchToProps(dispatch: any) : ComponentDispatchProps {
        const quotationInfoAction = new FetchAction.QuotationAction();
        const carLoadInfoAction = new CarFetchAction.CarByCustomerAction();
        const pendingQuotationsAction = new FetchAction.PendingQuotationsAction();
        const specifyQuotationNoteAction = new FetchAction.SpecifyQuotationNoteAction();

        const quotationItemsUpdateAction = new PostAction.QuotationItemsUpdateAction();
        const quotationEditAction = new PostAction.QuotationEditAction();
        const changeQuotationStatusAction = new PostAction.QuotationChangeStatusAction();
        const quotationNoteUpdateSpecifyStepAction = new PostAction.QuotationNoteUpdateSpecifyStepAction(); 
        
        return {
            getQuotation: (entry: any) => dispatch(quotationInfoAction.fetch(entry)),
            getQuotationNote: (quotationId: string, statusId: number) => dispatch(specifyQuotationNoteAction.fetch({ quotationId: quotationId, statusId: statusId })), 
            getPendingQuotations: (statusId: number, searchTerm: string) => dispatch(pendingQuotationsAction.fetch({ statusId: statusId, searchTerm: searchTerm })),
            
            updateNote: (request) => dispatch(quotationNoteUpdateSpecifyStepAction.post(request)),
            changeQuotationStatus: (request) => dispatch(changeQuotationStatusAction.post(request)),
            updateQuotationItems: (quotationId: string, items: Array<IQuotationItem>) => dispatch(quotationItemsUpdateAction.post({ quotationId, items })),
            updateQuotationInfo: (quotationId: string, quotation: IQuotation) => 
                dispatch(quotationEditAction.post({ quotationId: quotationId, quotationDTO: quotation})),
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
