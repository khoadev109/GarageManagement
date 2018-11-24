import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class ServiceUnitCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("ServiceUnit/Post"), 
            request
        );
    }
}

export class ServiceUnitEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("ServiceUnit/Put"), 
            request
        );
    }
}

export class ServiceUnitDeleteService implements ServiceProvider.IService {
    execute = (request: any) => { 
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("ServiceUnit/Delete"), 
            `?serviceUnitId=${request.accessaryUnitId}`
        );
    }
}
