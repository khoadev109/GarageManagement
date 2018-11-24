import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class AccessaryUnitCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("AccessaryUnit/Post"), 
            request
        );
    }
}

export class AccessaryUnitEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("AccessaryUnit/Put"), 
            request
        );
    }
}

export class AccessaryUnitDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("AccessaryUnit/Delete"), 
            `?accessaryUnitId=${request.accessaryUnitId}`
        );
    }
}
