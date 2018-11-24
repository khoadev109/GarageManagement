import GeneralState from "../../../core/state/general-state";
import { ICar } from "../state/car-state";
import { returnNumberOrDefaultValue, returnStringOrDefaultValue } from "../../../core/library/data-type";

module StateResponse {
    export function setCarResponse(dataResponse: any) {
        const carResult: ICar = {
            Id: returnStringOrDefaultValue(dataResponse.Id),
            GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
            Color: returnStringOrDefaultValue(dataResponse.Color),
            VinNumber: returnStringOrDefaultValue(dataResponse.VinNumber),
            MachineNumber: returnStringOrDefaultValue(dataResponse.MachineNumber),
            LicensePlates: returnStringOrDefaultValue(dataResponse.LicensePlates),
            Km: returnNumberOrDefaultValue(dataResponse.Km),
            BranchId: returnStringOrDefaultValue(dataResponse.BranchId),
            BranchName: returnStringOrDefaultValue(dataResponse.BranchName),
            ManufacturerId: returnNumberOrDefaultValue(dataResponse.ManufacturerId),
            ManufacturerName: returnStringOrDefaultValue(dataResponse.ManufacturerName),
            StyleId: returnNumberOrDefaultValue(dataResponse.StyleId),
            StyleName: returnStringOrDefaultValue(dataResponse.StyleName),
            ModelId: returnNumberOrDefaultValue(dataResponse.ModelId),
            ModelName: returnStringOrDefaultValue(dataResponse.ModelName),
            YearId: returnNumberOrDefaultValue(dataResponse.YearId),
            YearName: returnStringOrDefaultValue(dataResponse.YearName),
            CurrentCarOwnerId: returnStringOrDefaultValue(dataResponse.CurrentCarOwnerId),
            CurrentCarOwnerName: returnStringOrDefaultValue(dataResponse.CurrentCarOwnerName)
        };
        return carResult;
    }

    export function setBranchResponse(response: any) {
        const branches = new Array<GeneralState.Branch>();

        if (response) {
            response.map((branch) => { 
                branches.push(new GeneralState.Branch(branch.Id, branch.Name, branch.ShortName));
            })
        }
        
        return branches;
    }

    export function setManufacturersResponse(response: any) {
        const manufacturers = new Array<GeneralState.Manufacturer>(new GeneralState.Manufacturer(0, "Chọn hãng sản xuất"));
        
        if (response) {
            response.map((manufacturer) => { 
                manufacturers.push(new GeneralState.Manufacturer(manufacturer.Id, manufacturer.Name));
            })
        }

        return manufacturers;
    }

    export function setModelsByManufacturerResponse(response: any) {
        const models = new Array<GeneralState.Model>(new GeneralState.Model(0, "Chọn dòng xe"));

        if (response) {
            response.map((model) => { 
                models.push(new GeneralState.Model(model.Id, model.Name));
            })
        }

        return models;
    }

    export function setYearsByModelResponse(response: any) {
        const years = new Array<GeneralState.Year>(new GeneralState.Year(0, "Chọn năm sản xuất"));

        if (response) {
            response.map((year) => { 
                years.push(new GeneralState.Year(year.Id, year.Name));
            })
        }

        return years;
    }
}

export default StateResponse;
