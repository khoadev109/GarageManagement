import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CarService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Car/Get"), 
            `?carId=${request}`
        );
    }
}

export class OwnedCarsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Car/GetOwnedCarsByCustomerId"), 
            `?customerId=${request}`);
    }
}

export class CarsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                request.SearchTerm,
                request.SortName,
                request.SortDirection,
                request.PageIndex.toString(),
                request.PageSize.toString()
            );
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Car/GetFilterCarsWithPaging"), 
            parameters);
    }
}

export class CarByCustomerService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Car/GetCarByCustomerId"), 
            `?customerId=${request}`
        );
    }
}

// Temporary

export class AllManufacturersService implements ServiceProvider.IService {
    execute = () => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Common/GetAllManufacturer")
        );
    }
}

export class ModelsByManufacturerService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Common/GetModelByManufacturer"), 
            `?manufacturerId=${request}`
        );
    }
}

export class YearsByModelService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Common/GetYearByModel"),
            `?modelId=${request}`
        );
    }
}
