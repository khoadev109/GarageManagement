import GeneralState from  "../../../core/state/general-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailEmployeeResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            Employee: {
                Id: returnStringOrDefaultValue(dataResponse.Id),
                GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Phone: returnStringOrDefaultValue(dataResponse.Phone),
                Email: returnStringOrDefaultValue(dataResponse.Email),
                Address: returnStringOrDefaultValue(dataResponse.Address),
                Province: returnStringOrDefaultValue(dataResponse.Province),
                District: returnStringOrDefaultValue(dataResponse.District),
                Ward: returnStringOrDefaultValue(dataResponse.Ward),
                Birthday: returnStringOrDefaultValue(dataResponse.Birthday),
                IdentityCard: returnStringOrDefaultValue(dataResponse.IdentityCard),
                BranchId: returnStringOrDefaultValue(dataResponse.BranchId),
                BranchName: returnStringOrDefaultValue(dataResponse.BranchName)
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            Errors: this.errors
        }, 
        () => { callBack(); });
    }

    export function setResponseStateForBranch(response: any) {
        const branches = new Array<GeneralState.Branch>();
        if (response) {
            response.map((branch) => { 
                branches.push(new GeneralState.Branch(branch.Id, branch.Name, branch.ShortName));
            })
        }
        return branches;        
    }
}

export default StateResponse;
