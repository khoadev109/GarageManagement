import ServiceProvider from "../service/service-provider";

export interface IFetchAction {
    fetch: (entry: any) => any;
}

export interface IPostAction {
    post: (entry: any) => any;
}

export interface IBaseAction {
    dispatching: (entry: any, service: ServiceProvider.IService) => any;
}

export abstract class BaseAction implements IBaseAction {
    
    public dispatching(entry: any, service: ServiceProvider.IService, callback?: any) {
        return (dispatch: any) => {
            
            dispatch(this.request(entry));
            
            callback();

            service.execute(entry).then(
                result => dispatch(this.success(result)),
                error => dispatch(this.failure(error))
            );
        };
    }

    protected abstract requestAction: string;

    protected abstract successAction: string;
    
    protected abstract errorAction: string;
    
    private request(entry: any) { return { type: this.requestAction, entry } }

    private success(result: any) { return { type: this.successAction, result } }

    private failure(error: Error) { return { type: this.errorAction, error } }
}
