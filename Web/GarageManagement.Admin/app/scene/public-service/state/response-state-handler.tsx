import GeneralState from "../../../core/state/general-state";
import { 
    returnStringOrDefaultValue, 
    returnNumberOrDefaultValue, 
    returnBooleanOrDefaultValue 
} from "../../../core/library/data-type";

module StateResponse {
    export function setDetailServiceResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.GenerateId) > 0,
            LoadSucceed: true,
            PublicService: {
                Id: returnStringOrDefaultValue(dataResponse.Id),
                GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Cost: returnNumberOrDefaultValue(dataResponse.Cost),
                Description: returnStringOrDefaultValue(dataResponse.Description),
                ServiceTypeId: returnNumberOrDefaultValue(dataResponse.ServiceTypeId),
                ServiceTypeName: returnStringOrDefaultValue(dataResponse.ServiceTypeName),
                UnitId: returnNumberOrDefaultValue(dataResponse.UnitId),
                UnitName: returnStringOrDefaultValue(dataResponse.UnitName),
                BranchId: returnStringOrDefaultValue(dataResponse.BranchId),
                BranchName: returnStringOrDefaultValue(dataResponse.BranchName)
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            ServiceUnits: this.setResponseStateForServiceUnit(dataResponse.Units),
            ServiceTypes: this.setResponseStateForServiceType(dataResponse.ServiceTypes),
            Errors: this.errors
        }, 
        () => { callBack(); });
    }

    export function setResponseStateForBranch(branchesResponse) {
        let branches = new Array<GeneralState.Branch>();
        if (branchesResponse) {
            branchesResponse.map((branch, i) => {
                branches.push(new GeneralState.Branch(branch.Id, branch.Name, branch.ShortName));
            })
        }
        return branches;
    }

    export function setResponseStateForServiceUnit(serviceUnitsResponse) {
        let serviceUnits = new Array<GeneralState.ServiceUnit>();
        if (serviceUnitsResponse) {
            serviceUnitsResponse.map((serviceUnit, i) => {
                serviceUnits.push(new GeneralState.ServiceType(serviceUnit.Id, serviceUnit.Name));
            })
        }
        return serviceUnits;
    }

    export function setResponseStateForServiceType(serviceTypesResponse) {
        let serviceTypes = new Array<GeneralState.ServiceType>();
        if (serviceTypesResponse) {
            serviceTypesResponse.map((serviceType, i) => {
                serviceTypes.push(new GeneralState.ServiceType(serviceType.Id, serviceType.Name));
            })
        }
        return serviceTypes;
    }
}

export default StateResponse;
