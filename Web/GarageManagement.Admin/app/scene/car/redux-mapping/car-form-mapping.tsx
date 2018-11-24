import { connect } from "react-redux";
import { ICar } from "../state/car-state";
import { ReduxMapping } from "../../../core/redux/mapping";
import * as PostAction from "../action/post-action";
import * as FetchAction from "../action/fetch-action";

export interface IFormProps {
    branchId: any;
    customerId: any;
    customerName: any;
    customerExchangeId: any;
    selectedOwnedCarId: any;
    isCreateNewCustomer: any;

    carResult: any;
    ownedCarsResult: any;
    allManufacturersResult: any;
    modelsByManufacturerResult: any;
    yearsByModelResult: any;
    carCreateResult: any;
    carEditResult: any;
}

export interface IFormDispatchProps {
    closeModal: any;
    reloadCustomers: any;
    reloadCustomerInfoFromQuotation: any;
    reloadCars: any;

    edit(car: ICar): any;
    create(entry: any): any;
    getCar(carId: string): any;
    getOwnedCars(): any;
    getYearsByModel(modelId: number): any;
    getModelsManufacturer(manufacturerId: number): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

export class CarFormMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps: any) : IFormProps {
        return {
            branchId: ownProps.branchId,
            customerId: ownProps.customerId,
            customerName: ownProps.customerName,
            customerExchangeId: ownProps.customerExchangeId,
            selectedOwnedCarId: ownProps.selectedOwnedCarId,
            isCreateNewCustomer: ownProps.isCreateNewCustomer,

            carResult: state.CarReducer,
            ownedCarsResult: state.OwnedCarsReducer,
            allManufacturersResult: state.AllManufacturersReducer,
            modelsByManufacturerResult: state.ModelsByManufacturerReducer,
            yearsByModelResult: state.YearsByModelReducer,
            carCreateResult: state.CarCreateReducer, 
            carEditResult: state.CarEditReducer  
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IFormDispatchProps {
        const carAction = new FetchAction.CarAction();
        const ownedCarsAction = new FetchAction.OwnedCarsAction();
        const modelsByManufacturerAction = new FetchAction.ModelsByManufacturerAction();
        const yearsByModelAction = new FetchAction.YearsByModelAction();
        const carCreateAction = new PostAction.CarCreateAction();
        const carEditAction = new PostAction.CarEditAction();

        return {
            closeModal: ownProps.closeModal,
            reloadCustomers: ownProps.reloadCustomers,
            reloadCustomerInfoFromQuotation: ownProps.reloadCustomerInfoFromQuotation,
            reloadCars: ownProps.reloadCars,

            edit: (car: ICar) => dispatch(carEditAction.post(car)),
            create: (entry: any) => dispatch(carCreateAction.post(entry)),
            getCar: (carId: string) => dispatch(carAction.fetch(carId)),
            getOwnedCars: () => dispatch(ownedCarsAction.fetch(ownProps.customerId)),
            getYearsByModel: (modelId: number) => dispatch(yearsByModelAction.fetch(modelId)),
            getModelsManufacturer: (manufacturerId: number) => dispatch(modelsByManufacturerAction.fetch(manufacturerId)),
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps, null, { withRef: true })(component);
    }
}
