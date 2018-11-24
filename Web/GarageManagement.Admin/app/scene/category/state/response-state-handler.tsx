import GeneralState from "../../../core/state/general-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailCategoryResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            Category: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ParentId: returnNumberOrDefaultValue(dataResponse.ParentId),
                ParentName: returnStringOrDefaultValue(dataResponse.ParentName)
            },
            Errors: this.errors
        }, 
        () => { callBack(); });
    }

    export function setParentCategoriesResponse(response: any) {
        const parents = new Array<GeneralState.Category>();
        if (response) {
            response.map((parent) => {
                if(parent.Id !== this.state.Category.Id)
                    parents.push(new GeneralState.Category(parent.Id, parent.Name));
            })
        }
        return parents;
    }
}

export default StateResponse;
