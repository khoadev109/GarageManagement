import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class GetByUserService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("RoleRightModule/GetByUser"),
            `?userId=${request}`
        );
    }
}

export class GetByRoleService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("RoleRightModule/GetByRole"),
            `?roleId=${request}`
        );
    }
}

export class GetRoleService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("RoleRightModule/Get")
        );
    }
}

export class GetUserService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("User/Get")
        );
    }
}

export class GetModuleService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Module/Get")
        );
    }
}
