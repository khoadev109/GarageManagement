export var FetchAPIMethod;
(function (FetchAPIMethod) {
    FetchAPIMethod["GET"] = "GET";
    FetchAPIMethod["POST"] = "POST";
    FetchAPIMethod["PUT"] = "PUT";
    FetchAPIMethod["DELETE"] = "DELETE";
})(FetchAPIMethod || (FetchAPIMethod = {}));
export class APIService {
    constructor() {
        this.result = (url, init) => {
            return fetch(new Request(url, init))
                .then(response => response.json())
                .catch(error => console.log(error));
        };
        this.reInitializeInitOptionIfUsingCustomInit = (customInit) => {
            if (customInit != null)
                this.initOption = customInit;
        };
        this.get = (getRequestUrl, headerParameters = "", customInit = null) => {
            getRequestUrl = getRequestUrl.concat(headerParameters);
            this.initOption.method = FetchAPIMethod.GET;
            this.reInitializeInitOptionIfUsingCustomInit(customInit);
            return this.result(getRequestUrl, this.initOption);
        };
        this.post = (postRequestUrl, bodyParameters, customInit = null) => {
            this.initOption.method = FetchAPIMethod.POST;
            this.initOption.headers = new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            });
            this.initOption.body = JSON.stringify(bodyParameters);
            this.reInitializeInitOptionIfUsingCustomInit(customInit);
            return this.result(postRequestUrl, this.initOption);
        };
        this.put = (putRequestUrl, bodyParameters, customInit = null) => {
            this.initOption.method = FetchAPIMethod.PUT;
            this.initOption.headers = new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            });
            this.initOption.body = JSON.stringify(bodyParameters);
            this.reInitializeInitOptionIfUsingCustomInit(customInit);
            return this.result(putRequestUrl, this.initOption);
        };
        this.delete = (deleteRequestUrl, deleteParameters, customInit = null) => {
            deleteRequestUrl = deleteRequestUrl.concat(deleteParameters);
            this.initOption.method = FetchAPIMethod.DELETE;
            this.reInitializeInitOptionIfUsingCustomInit(customInit);
            return this.result(deleteRequestUrl, this.initOption);
        };
        this.initOption = {
            mode: "cors",
            cache: "default",
            credentials: "include",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "text/plain"
            })
        };
    }
}
//# sourceMappingURL=fetch-api.js.map