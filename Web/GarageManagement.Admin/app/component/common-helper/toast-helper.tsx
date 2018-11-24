import { toast } from "react-toastify";

module ToastHelper {
    enum ToastStatus {
        Success = "Success",
        Warning = "Warning",
        Error = "Error"
    }
    
    const DEFAULT_AUTO_CLOSE_TIME_OUT_SUCCESS = 2000;
    const DEFAULT_AUTO_CLOSE_TIME_OUT_WARNING = 3500;
    const DEFAULT_AUTO_CLOSE_TIME_OUT_ERROR = 3500;

    export function getAutoCloseTimeout(status: ToastStatus, autoCloseTimeout: number) {
        if (autoCloseTimeout) {
            return autoCloseTimeout;
        }

        if (ToastStatus[status] === ToastStatus.Success) {
            return DEFAULT_AUTO_CLOSE_TIME_OUT_SUCCESS;
        }

        if (ToastStatus[status] === ToastStatus.Warning) {
            return DEFAULT_AUTO_CLOSE_TIME_OUT_WARNING;
        }

        if (ToastStatus[status] === ToastStatus.Error) {
            return DEFAULT_AUTO_CLOSE_TIME_OUT_ERROR;
        }
    }

    export function getAutoCloseTimeoutSuccess(autoCloseTimeout: number) {
        return this.getAutoCloseTimeout(this.ToastStatus.Success, autoCloseTimeout);
    }

    export function getAutoCloseTimeoutWarning(autoCloseTimeout: number) {
        return this.getAutoCloseTimeout(this.ToastStatus.Warning, autoCloseTimeout);
    }

    export function getAutoCloseTimeoutError(autoCloseTimeout: number) {
        return this.getAutoCloseTimeout(this.ToastStatus.Error, autoCloseTimeout);
    }

    export function notifySuccess(message: string, autoCloseTimeout?: number) {
        toast.success(
            message, 
            { 
                position: toast.POSITION.TOP_CENTER, 
                autoClose: this.getAutoCloseTimeoutSuccess(autoCloseTimeout) 
            }
        );
    }

    export function notifyWarning(message: string, autoCloseTimeout?: number) {
        toast.warn(
            message, 
            { 
                position: toast.POSITION.TOP_CENTER, 
                autoClose: this.getAutoCloseTimeoutWarning(autoCloseTimeout) 
            }
        );
    }

    export function notifyError(message: string, autoCloseTimeout?: number) {
        toast.error(
            message, 
            { 
                position: toast.POSITION.TOP_CENTER, 
                autoClose: this.getAutoCloseTimeoutError(autoCloseTimeout) 
            }
        );
    }
}

export default ToastHelper;
