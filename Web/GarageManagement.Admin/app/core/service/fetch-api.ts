import { Cookie } from "../library/cookie";
import ToastHelper from "component/common-helper/toast-helper";
import * as Constants from "../library/constants";

module FetchApi {
  export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }
  
  export class Caller {
    private readonly _accessToken: string;
    private readonly _defaultRequestInit: RequestInit;

    get DefaultRequestInit() {
      return this._defaultRequestInit;
    }
    
    constructor() {
      this._accessToken = Cookie.getCookie(Constants.AUTH_COOKIE_NAME);

      this._defaultRequestInit = {
        mode: "cors",
        cache: "default",
        //credentials: "include",
        headers: new Headers({
          // "Accept": "application/json", 
          // "Content-Type": "text/plain"
          "Authorization": `Bearer ${this._accessToken}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        })
      };
    }

    public Get(requestUrl: string, queryString: string = "", customRequestOption: RequestInit = null) {
      const requestInit = this.GetRequestInit(customRequestOption, () => { 
        const initOption = this.DefaultRequestInit;
        initOption.method = Method.GET;
        return initOption;
      });
      
      return this.FetchResult(requestUrl.concat(queryString), requestInit);
    }
    
    public Post(requestUrl: string, bodyParameters: {}, customRequestInit?: RequestInit) {
      const requestInit = this.GetRequestInit(customRequestInit, () => {
        const initOption = this.DefaultRequestInit;
        initOption.method = Method.POST;
        initOption.body = JSON.stringify(bodyParameters);
        return initOption;
      });

      return this.FetchResult(requestUrl, requestInit);
    }
    
    public PostForm(requestUrl: string, bodyParameters: {}, customRequestInit?: RequestInit) {
      const requestInit = this.GetRequestInit(customRequestInit, () => {
        const initOption = this.DefaultRequestInit;
        initOption.method = Method.POST;
        initOption.headers = new Headers({
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        });
        
        const formBody = new Array<string>();
        for (let property in bodyParameters) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(bodyParameters[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        
        initOption.body = formBody.join("&");
        return initOption;
      });
      
      return this.FetchResult(requestUrl, requestInit);
    }
    
    public Put(requestUrl: string, bodyParameters: {}, queryString: string = "", customRequestInit?: RequestInit) {
      const requestInit = this.GetRequestInit(customRequestInit, () => {
        const initOption = this.DefaultRequestInit;
        initOption.method = Method.PUT;
        initOption.body = JSON.stringify(bodyParameters);
        return initOption;
      });
  
      return this.FetchResult(requestUrl.concat(queryString), requestInit);
    }
    
    public Delete(requestUrl: string, queryString: string, customRequestInit?: RequestInit) {
      const requestInit = this.GetRequestInit(customRequestInit, () => { 
        const initOption = this.DefaultRequestInit;
        initOption.method = Method.DELETE;
        return initOption;
      });
  
      return this.FetchResult(requestUrl.concat(queryString), requestInit);
    }
    
    private GetRequestInit(customRequestInit: RequestInit, initFunc: () => RequestInit) {
      return customRequestInit ? customRequestInit : initFunc();
    }
    
    private FetchResult(url: string, init: RequestInit) {
      const result = fetch(new Request(url, init))
                        .then(response => response.json());

      return result.then(response => {
              if (!response.Success && response.State) {
                
                if (response.State !== 403) {
                  Cookie.deleteCookie(Constants.AUTH_COOKIE_NAME);
                  location.href = "/";
                }
                ToastHelper.notifyError(response.Message);
              }

              return response;

          }).catch((error: Error) => { 
            console.log(error);
            ToastHelper.notifyError(error.message);
          });
    }
  }
}

export default FetchApi;
