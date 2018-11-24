import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";
import * as LocaleAction from "../../../core/locale/action/fetch-action";

export interface IFormProps {
    branchResult: any;
    branchEditResult: any;
    branchCreateResult: any;
    provinceResult: any;
    districtResult: any;
    wardResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadBranches: any;
    getProvince(entry?: any): any;
    getDistrict(entry?: any): any;
    getWard(entry?: any): any;
    getBranch(): any;
    create(entry: any): any;
    edit(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class BranchFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            branchResult: state.BranchReducer,
            branchEditResult: state.BranchEditReducer,
            branchCreateResult: state.BranchCreateReducer,
            provinceResult: state.ProvincesReducer,
            districtResult: state.DistrictsReducer,
            wardResult: state.WardsReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const branchAction = new FetchAction.BranchAction();
        const branchEditAction = new PostAction.BranchEditAction();
        const branchCreateAction = new PostAction.BranchCreateAction();
        const provinceAction = new LocaleAction.ProvinceAction();
        const districtAction = new LocaleAction.DistrictAction();
        const wardAction = new LocaleAction.WardAction();

        return {
            closeModal: ownProps.closeModal,
            reloadBranches: ownProps.reloadBranches,
            getProvince: (entry: any) => dispatch(provinceAction.fetch(entry)),
            getDistrict: (entry: any) => dispatch(districtAction.fetch(entry)),
            getWard: (entry: any) => dispatch(wardAction.fetch(entry)),
            getBranch: () => dispatch(branchAction.fetch(ownProps.branchId)),
            create: (entry: any) => dispatch(branchCreateAction.post(entry)),
            edit: (entry: any) => dispatch(branchEditAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
