import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CustomerCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Customer/Post"), 
            request
        );
    }
}

export class CustomerEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Customer/Put"), 
            request, 
            `?customerId=${request.Id}`);
    }
}

export class CustomerDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("Customer/Delete"), 
            `?customerId=${request.customerId}`
        );
    }
}
