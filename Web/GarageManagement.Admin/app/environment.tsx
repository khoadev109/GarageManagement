module Environment {
    export class HostUrl {
        public static localHostUrl = "http://localhost:61338";
        public static productionUrl = "http://120.72.98.63:3001";
        public static testUrl = "http://120.72.98.63:4001";
    }
    
    export class Host {
        private readonly _isLocal : boolean; 
        private readonly _isTesting : boolean;
        private readonly _isProduction : boolean;

        constructor() {
            this._isTesting = location.href.indexOf("4000") > -1;
            this._isProduction = location.href.indexOf("3000") > -1;
            this._isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";
        }
        
        get BaseUrl() {
            if (this._isLocal)
                return HostUrl.localHostUrl;
            if (this._isProduction)
                return HostUrl.productionUrl;
            if (this._isTesting)
                return HostUrl.testUrl;
            return "";
        }

        get IsLocalUrl() { return this._isLocal; }
    }
    
    export function GetApiUrl(apiUrl: string) {
        return `${new Host().BaseUrl}/api/${apiUrl}`;
    }    
}

export default Environment;
