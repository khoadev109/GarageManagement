import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class GarageUpdateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Garage/PutUpdateGarageInformation"), 
            request
        );
    }
}
