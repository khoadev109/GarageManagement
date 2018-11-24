import GeneralState from "../../../core/state/general-state";
import { 
    returnStringOrDefaultValue, 
    returnNumberOrDefaultValue, 
    returnBooleanOrDefaultValue 
} from "../../../core/library/data-type";

module StateResponse {
    export function setDetailAccessaryResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.GenerateId) > 0,
            Accessary: {
                Id: returnStringOrDefaultValue(dataResponse.Id),
                GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Image: returnStringOrDefaultValue(dataResponse.Image),
                BarCode: returnStringOrDefaultValue(dataResponse.BarCode),
                Price: returnNumberOrDefaultValue(dataResponse.Price),
                CostGoodSold: returnNumberOrDefaultValue(dataResponse.CostGoodSold),
                OutOfStock: returnBooleanOrDefaultValue(dataResponse.OutOfStock),
                Description: returnStringOrDefaultValue(dataResponse.Description),
                CategoryId: returnNumberOrDefaultValue(dataResponse.CategoryId),
                CategoryName: returnStringOrDefaultValue(dataResponse.CategoryName),
                UnitId: returnNumberOrDefaultValue(dataResponse.UnitId),
                UnitName: returnStringOrDefaultValue(dataResponse.UnitName),
                BranchId: returnStringOrDefaultValue(dataResponse.BranchId),
                BranchName: returnStringOrDefaultValue(dataResponse.BranchName),
                IsInputAccessaryId: returnBooleanOrDefaultValue(this.state.Accessary.IsInputAccessaryId)
            },
            Branches: this.setBranchsResponse(dataResponse.Branches),
            AccessariesUnits: this.setAccessaryUnitsResponse(dataResponse.Units),
            Categories: this.setCategoriesResponse(dataResponse.Categories),
            Errors: this.errors
        }, 
        () => { callBack(); });
    }

    export function setBranchsResponse(response: any) {
        const branches = new Array<GeneralState.Branch>();
        if (response) {
            response.map((branch) => { 
                branches.push(new GeneralState.Branch(branch.Id, branch.Name, branch.ShortName));
            })
        }
        return branches;        
    }

    export function setAccessaryUnitsResponse(response: any) {
        const accessaryUnits = new Array<GeneralState.AccessaryUnit>();
        if (response) {
            response.map((accessaryUnit) => { 
                accessaryUnits.push(new GeneralState.AccessaryUnit(accessaryUnit.Id, accessaryUnit.Name ));
            })
        }
        return accessaryUnits;        
    }

    export function setCategoriesResponse(response: any) {
        const categories = new Array<GeneralState.Category>();
        if (response) {
            response.map((category) => { 
                categories.push(new GeneralState.Category(category.Id, category.Name ));
            })
        }
        return categories;        
    }
}

export default StateResponse;
