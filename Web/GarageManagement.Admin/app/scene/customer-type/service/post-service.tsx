import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CustomerTypeCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("CustomerType/Post"),
            request
        );
    }
}

export class CustomerTypeEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("CustomerType/Put"), 
            request
        );
    }
}

export class CustomerTypeDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("CustomerType/Delete"), 
            `?customerTypeId=${request.customerTypeId}`
        );
    }
}
