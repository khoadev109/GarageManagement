export interface IResponseState {
    target: [],
    loading: boolean,
    error: any
}

export const ResponseState : IResponseState = {
    target: [],
    loading: false,
    error: Error
}

class CoreReducer {
    public static Create<R, S, E>(action: any, state = ResponseState) {
        let request: R;
        let success: S;
        let error: E;

        switch (action.type) {
            case request:
                return {
                    ...state,
                    loading: true
                };
            case success:
                return {
                    ...state,
                    loading: false,
                    target: action.result
                };
            case error:
                return {
                    ...state,
                    loading: false, 
                    error: action.error
                };
            default:
                return state;
        }
    }
}

export default CoreReducer;
