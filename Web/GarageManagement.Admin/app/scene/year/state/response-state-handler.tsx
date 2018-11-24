import GeneralState from "../../../core/state/general-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailYearResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            Year: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ModelId: returnNumberOrDefaultValue(dataResponse.ModelId),
                ModelName: returnStringOrDefaultValue(dataResponse.ModelName)
            },
            CarModels: this.setCarModelsResponse(dataResponse.CarModels),
        }, 
        () => { callBack(); });
    }

    function setCarModelsResponse(response) {
        const models = new Array<GeneralState.Model>();
        if (response) {
            response.map((model, i) => { 
                models.push(new GeneralState.Model(model.Id, model.Name));
            })
        }
        return models;        
    }
}

export default StateResponse;
