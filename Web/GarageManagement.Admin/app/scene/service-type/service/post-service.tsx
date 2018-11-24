import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class ServiceTypeCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("ServiceType/Post"), 
            request
        );
    }
}

export class ServiceTypeEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("ServiceType/Put"), 
            request
        );
    }
}

export class ServiceTypeDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("ServiceType/Delete"),
            `?id=${request.serviceTypeId}`
        );
    }
}
