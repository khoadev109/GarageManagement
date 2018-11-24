import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class ManufacturerCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Manufacturer/Post"), 
            request
        );
    }
}

export class ManufacturerEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Manufacturer/Put"), 
            request
        );
    }
}

export class ManufacturerDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("Manufacturer/Delete"),
            `?id=${request.manufacturerId}`
        );
    }
}
