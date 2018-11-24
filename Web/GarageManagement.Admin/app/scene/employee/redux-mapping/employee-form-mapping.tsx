import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";
import * as LocaleAction from "../../../core/locale/action/fetch-action";

export interface IFormProps {
    employeeResult: any,
    employeeEditResult: any,
    employeeCreateResult: any,
    provinceResult: any,
    districtResult: any,
    wardResult: any
}

export interface IFormDispatchProps {
    closeModal: any,
    reloadEmployees: any,
    getEmployee: () => any,
    create: (entry: any) => any,
    edit: (entry: any) => any,
    getProvince: (entry?: any) => any,
    getDistrict: (entry?: any) => any,
    getWard: (entry?: any) => any
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class EmployeeFormMapping implements ReduxMapping {
    
    mapStateToProps(state: any, ownProps?: any) : IFormProps {
        return {
            employeeResult: state.EmployeeReducer,
            employeeEditResult: state.EmployeeEditReducer,
            employeeCreateResult: state.EmployeeCreateReducer,
            provinceResult: state.ProvincesReducer,
            districtResult: state.DistrictsReducer,
            wardResult: state.WardsReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const employeeAction = new FetchAction.EmployeeAction();
        const employeeEditAction = new PostAction.EmployeeEditAction();
        const employeeCreateAction = new PostAction.EmployeeCreateAction();
        const provinceAction = new LocaleAction.ProvinceAction();
        const districtAction = new LocaleAction.DistrictAction();
        const wardAction = new LocaleAction.WardAction();

        return {
            closeModal: ownProps.closeModal,
            reloadEmployees: ownProps.reloadEmployees,
            getEmployee: () => dispatch(employeeAction.fetch(ownProps.employeeId)),
            create: (entry: any) => dispatch(employeeCreateAction.post(entry)),
            edit: (entry: any) => dispatch(employeeEditAction.post(entry)),
            getProvince: (entry: any) => dispatch(provinceAction.fetch(entry)),
            getDistrict: (entry: any) => dispatch(districtAction.fetch(entry)),
            getWard: (entry: any) => dispatch(wardAction.fetch(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
