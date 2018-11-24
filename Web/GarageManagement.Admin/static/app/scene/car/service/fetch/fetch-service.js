import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class CarService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?carId=${request}`;
            return apiService.get(APIUrl.CAR_API, parameters);
        };
    }
}
export class CarsFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.CARS_WITH_PAGING_API, parameters);
        };
    }
}
// Temporary
export class AllManufacturersService {
    constructor() {
        this.execute = () => {
            let apiService = new APIService();
            return apiService.get(APIUrl.ALL_MANUFACTURERS_API);
        };
    }
}
export class ModelsByManufacturerService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?manufacturerId=${request.manufacturerId}`;
            return apiService.get(APIUrl.MODELS_BY_MANUFACTURER_API);
        };
    }
}
export class YearsByModelService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?manufacturerId=${request.modelId}`;
            return apiService.get(APIUrl.YEARS_BY_MODEL_API);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map