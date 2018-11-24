import ToastHelper from "component/common-helper/toast-helper";

module StateResponse {
    export function setStateForPrintTemplateResponse(dataResponse: any, callBack?: any){
        this.setState({   
            Id: dataResponse.Id,             
            Content: dataResponse.Content
        },
        () => { callBack(); });
    }

    export function setStateForAddOrUpdatePrintTemplateResponse(dataResponse: any){        
        if (dataResponse.Success){
            ToastHelper.notifySuccess(`Cập nhật thành công!`);            
        }
        else {
            ToastHelper.notifySuccess(`Cập nhật thất bại!`);
        }        
    }
}

export default StateResponse;
