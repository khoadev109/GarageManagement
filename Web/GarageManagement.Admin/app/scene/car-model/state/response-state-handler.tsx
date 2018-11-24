import GeneralState from "../../../core/state/general-state";
import { returnStringOrDefaultValue, returnNumberOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setDetailCarModelResponse(dataResponse: any, callBack?: any) {
        this.setState({
            IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
            CarModel: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                Description: returnStringOrDefaultValue(dataResponse.Description),
                StyleId: returnNumberOrDefaultValue(dataResponse.StyleId),
                StyleName: returnStringOrDefaultValue(dataResponse.StyleName),
                ManufacturerId: returnNumberOrDefaultValue(dataResponse.ManufacturerId),
                ManufacturerName: returnStringOrDefaultValue(dataResponse.ManufacturerName)
            },
            Styles: this.setResponseStateForStyle(dataResponse.Styles),
            Manufacturers: this.setResponseStateForManufacturer(dataResponse.Manufacturers)
        }, 
        () => { callBack(); });
    }

    export function setStylesResponse(response: any) {
        const styles = new Array<GeneralState.Style>();
        if (response) {
            response.map((style) => { 
                styles.push(new GeneralState.Style(style.Id, style.Name ));
            })
        }
        return styles;        
    }

    export function setManufacturersResponse(response: any) {
        const manufacturers = new Array<GeneralState.Manufacturer>();
        if (response) {
            response.map((manufacturer, i) => {
                manufacturers.push(new GeneralState.Manufacturer(manufacturer.Id, manufacturer.Name));
            })
        }
        return manufacturers;      
    }
}

export default StateResponse;
