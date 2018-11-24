import Dictionary from "../library/dictionary";
import { SortDirection } from "../component/base-paging-component";

module ServiceProvider {
    export interface IService {
        execute: (request?: any, optionalRequest?: any) => Promise<any>
    } 
    
    export function GenerateQueryStringFromKeyValuePair(parameterInputs: Dictionary.IKeyedCollection<any>) {
        let queryString = "";
        
        for (let index = 0; index < parameterInputs.getKeys().length; index++) {
            const concatCharacter = index == 0 ? "?" : "&";
    
            const parameterName = parameterInputs.getKeys()[index];
            const parameterValue = parameterInputs.getItem(parameterName);
    
            queryString = queryString.concat(concatCharacter, `${parameterName}=${parameterValue}`);
        }
        return queryString;
    }
    
    export function GeneratePagingQueryString(searchTerm: string, sortName: string, sortDirection: SortDirection, pageIndex: number, pageSize: number) {
        const pagingParameters = new Dictionary.KeyedCollection<any>();
        pagingParameters.add("searchTerm", searchTerm);
        pagingParameters.add("sortName", sortName);
        pagingParameters.add("sortDirection", sortDirection);
        pagingParameters.add("pageIndex", pageIndex.toString());
        pagingParameters.add("pageSize", pageSize.toString());
    
        const pagingQueryString = GenerateQueryStringFromKeyValuePair(pagingParameters);
        return pagingQueryString;
    }  
}

export default ServiceProvider;
