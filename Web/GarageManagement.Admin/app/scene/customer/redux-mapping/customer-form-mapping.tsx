import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as LocaleAction from "../../../core/locale/action/fetch-action";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    customerId: any;
    selectedOwnedCarId: any;
    customerResult: any;
    customerEditResult: any;
    customerCreateResult: any;
    provinceResult: any;
    districtResult: any;
    wardResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadCustomers: any;
    reloadCustomerInfoFromQuotation: any;
    getCustomer(): any;
    create(entry: any): any;
    edit(entry: any): any;
    getProvince(entry?: any): any;
    getDistrict(entry?: any): any;
    getWard(entry?: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class CustomerFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            customerId: ownProps.customerId,
            selectedOwnedCarId: ownProps.selectedOwnedCarId,
            customerResult: state.CustomerReducer,
            customerEditResult: state.CustomerEditReducer,
            customerCreateResult: state.CustomerCreateReducer,
            provinceResult: state.ProvincesReducer,
            districtResult: state.DistrictsReducer,
            wardResult: state.WardsReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const specifyCustomerAction = new FetchAction.CustomerAction();
        const customerEditAction = new PostAction.CustomerEditAction();
        const customerCreateAction = new PostAction.CustomerCreateAction();
        const provinceAction = new LocaleAction.ProvinceAction();
        const districtAction = new LocaleAction.DistrictAction();
        const wardAction = new LocaleAction.WardAction();

        return {
            closeModal: ownProps.closeModal,
            reloadCustomers: ownProps.reloadCustomers,
            reloadCustomerInfoFromQuotation: ownProps.reloadCustomerInfoFromQuotation,
            getCustomer: () => dispatch(specifyCustomerAction.fetch(ownProps.customerId)),
            create: (entry: any) => dispatch(customerCreateAction.post(entry)),
            edit: (entry: any) => dispatch(customerEditAction.post(entry)),
            getProvince: (entry: any) => dispatch(provinceAction.fetch(entry)),
            getDistrict: (entry: any) => dispatch(districtAction.fetch(entry)),
            getWard: (entry: any) => dispatch(wardAction.fetch(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
