module Validation {
    export const EMAIL_ERROR_MESSAGE = "Email không hợp lệ. ";
    export const NUMBER_ERROR_MESSAGE = "Vui lòng nhập số. ";
    export const REQUIRED_ERROR_MESSAGE = "Vui lòng nhập dữ liệu. ";
    export const NUMBER_REQUIRED_ERROR_MESSAGE = "Vui lòng nhập giá trị lớn hơn 0. ";
    export const CONFIRMPASSWORD_ERROR_MESSAGE = "Mật khẩu xác nhận không đúng. ";

    export const MAXLENGTH_ERROR_MESSAGE = (value) => { return `Vui lòng nhập tối đa ${value} ký tự. `; }
    export const MINLENGTH_ERROR_MESSAGE = (value) => { return `Vui lòng nhập tối thiểu ${value} ký tự. `; }

    export interface IValidationResult {
        isValid: boolean,
        errorMessage: string
    }

    export class ValidationFactory {
        execute(validator: BaseValidation): string {
            const result = validator.validate();
            return result.errorMessage;
        }
    }
    
    export class BaseValidation {
        public name: string;
        public value: any;
        public required: boolean;
        public valueCompare: any;

        constructor(name: string, value: any, required?: boolean, valueCompare?: any) {
            this.name = name;
            this.value = value;
            this.required = required;
            this.valueCompare = valueCompare;
        }

        public validate() : IValidationResult {
            return { isValid: true, errorMessage: "" };
        }

        protected returnValidResult(isValid: boolean, message: string) : IValidationResult {
            return { isValid: isValid, errorMessage: message };
        }

        protected checkAndReturnRequiredResult() : any {
            const isNotValidRequired = !this.isValidRequired();
            
            if (isNotValidRequired) {
                let errorMessage = "";
                
                if (this.value == "")
                    errorMessage = REQUIRED_ERROR_MESSAGE;
                if (this.value == "0")
                    errorMessage = NUMBER_REQUIRED_ERROR_MESSAGE;

                return this.returnValidResult(false, errorMessage);
            }
        }

        protected isValidRequired() : boolean {
            return this.value === "" && this.value.length === 0;
        }

        protected isValidEmail() : boolean {
            return this.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        }
        
        protected isValidNumber() : boolean {
            return !isNaN(this.value);
        }

        protected isValidMinLength() : boolean {
            return this.value.length >= this.valueCompare;
        }

        protected isValidMaxLength() : boolean {
            return this.value.length <= this.valueCompare;
        }

        protected isValidConfirmPassword() : boolean {
            return this.value === this.valueCompare;
        }
    }
}

export default Validation;
