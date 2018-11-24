import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CarCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Car/Post"), 
            request
        );
    }
}

export class CarEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Car/Put"), 
            request
        );
    }
}

export class CarDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = request.customerId
                            ? `?carId=${request.carId}&customerId=${request.customerId}`
                            : `?carId=${request.carId}`;
        
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("Car/Delete"), 
            parameters
        );
    }
}
