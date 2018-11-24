import ServiceProvider from "../../service/service-provider";
import FetchApi from "../../service/fetch-api";
import Environment from "environment";

export function GetLocaleApiUrl(apiUrl: string) {
    const baseUrl = new Environment.Host().IsLocalUrl 
                        ? "app/core/locale/model" 
                        : "locale";
                        
    return `${baseUrl}/${apiUrl}`;
}

export class ProvinceService implements ServiceProvider.IService {
    execute = (request: any) => { 
        const apiUrl = GetLocaleApiUrl("provinces.json");
        return new FetchApi.Caller().Get(apiUrl);
    }
}

export class DistrictService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const apiUrl = GetLocaleApiUrl("districts.json");
        return new FetchApi.Caller().Get(apiUrl);
    }
}

export class WardService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const apiUrl = GetLocaleApiUrl("wards.json");
        return new FetchApi.Caller().Get(apiUrl);
    }
}
