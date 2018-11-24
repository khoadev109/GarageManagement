import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class LoginService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().PostForm(
            Environment.GetApiUrl("token"), 
            request
        );
    }      
}

export class LogoutService implements ServiceProvider.IService {
    execute = () => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Base/LogOut")
        );
    }
}
