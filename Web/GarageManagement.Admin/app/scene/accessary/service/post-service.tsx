import FetchApi from "../../../core/service/fetch-api";
import ServiceProvider from "core/service/service-provider";
import Environment from "environment";

export class AccessaryCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Accessary/Post"), 
            request
        );
    }
}

export class AccessaryEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Accessary/Put"), 
            request
        );
    }
}

export class AccessaryDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("Accessary/Delete"), 
            `?accessaryId=${request.accessaryId}`
        );
    }
}
