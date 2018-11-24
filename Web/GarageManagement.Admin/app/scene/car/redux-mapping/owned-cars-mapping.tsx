import { connect } from "react-redux";
import { ReduxMapping } from "../../../core/redux/mapping";
import { IOwnedCar } from "../state/owned-cars-state";
import * as PostAction from "../action/post-action";

export interface IProps {
    cars: Array<IOwnedCar>;
    customerId: string;
    customerName: any;
    deleteResult: any;
}

export interface IDispatchProps {
    reloadOwnedCars: () => void;
    clearInfoAndAddNewCar?: () => void;
    selectSpecifyCarToLoad?: (carId: string) => void;
    deleteOwnedCar(entry: any): any;
}

export interface CombinedProps extends IProps, IDispatchProps { }

export class OwnedCarsMapping implements ReduxMapping {

    mapStateToProps(state: any, ownProps: any) : IProps {
        return {
            cars: ownProps.Cars,
            customerId: ownProps.customerId,
            customerName: ownProps.CustomerName,
            deleteResult: state.CarDeleteReducer
        }
    }
    
    mapDispatchToProps(dispatch: any, ownProps?: any) : IDispatchProps {
        const deleteAction = new PostAction.CarDeleteAction();

        return {
            clearInfoAndAddNewCar: ownProps.ClearInfoAndAddNewCar,
            selectSpecifyCarToLoad: ownProps.SelectSpecifyCarToLoad,
            reloadOwnedCars: ownProps.reloadOwnedCars,
            deleteOwnedCar: (entry: any) => dispatch(deleteAction.post(entry))
        }
    }

    connectComponent(component: any) {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(component);
    }
}
