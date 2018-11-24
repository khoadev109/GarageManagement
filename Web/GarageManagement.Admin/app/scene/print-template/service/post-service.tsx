import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class AddOrUpdatePrintTemplateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Quotation/AddOrUpdatePrintTemplate"), 
            request
        );
    }
}
