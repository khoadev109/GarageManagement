import Validation from "./base-validation";

module FormValidation {
    export class RequiredValidation extends Validation.BaseValidation {
        constructor(name: string, value: any) {
            super(name, value);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.checkAndReturnRequiredResult();
        }
    }
    
    export class EmailValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, required?: boolean) {
            super(name, value, required);
            this.value = value ? value : "";
        }
        
        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputEmail() 
                                 : this.validateIfNotRequiredInputEmail();
        }

        private validateIfRequiredInputEmail() {
            this.checkAndReturnRequiredResult();

            return this.returnEmailResult(this.isValidEmail());
        }
        
        private validateIfNotRequiredInputEmail() {
            return this.returnEmailResult(this.value.length == 0 || (this.value.length > 0 && this.isValidEmail()));
        }

        private returnEmailResult(valid: boolean) {
            return valid ? this.returnValidResult(true, "")
                         : this.returnValidResult(false, Validation.EMAIL_ERROR_MESSAGE);
        }
    }
    
    export class NumberValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, required?: boolean) {
            super(name, value, required);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputNumber() 
                                 : this.validateIfNotRequiredInputNumber();
        }

        private validateIfRequiredInputNumber() {
            this.checkAndReturnRequiredResult();

            return this.returnNumberResult(this.isValidNumber());
        }

        private validateIfNotRequiredInputNumber() {
            return this.returnNumberResult(this.value.length == 0 || (this.value.length > 0 && this.isValidNumber()));
        }

        private returnNumberResult(valid: boolean) {
            return valid ? this.returnValidResult(true, "")
                         : this.returnValidResult(false, Validation.NUMBER_ERROR_MESSAGE);
        }
    }

    export class MinLengthValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, valueCompare?: any, required?: boolean) {
            super(name, value, valueCompare, required);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputMinLength() 
                                 : this.validateIfNotRequiredInputMinLength();
        }

        private validateIfRequiredInputMinLength() {
            this.checkAndReturnRequiredResult();

            return this.returnMinLengthResult(this.isValidMinLength());
        }

        private validateIfNotRequiredInputMinLength() {
            return this.returnMinLengthResult(this.value.length === 0 || (this.value.length > 0 && this.isValidMinLength()));
        }

        private returnMinLengthResult(valid: boolean) {
            return valid ? this.returnValidResult(true, "")
                         : this.returnValidResult(false, Validation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare));
        }
    }

    export class NumberAndMinLengthValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, valueCompare?: any, required?: boolean) {
            super(name, value, valueCompare, required);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputMinLengthAndNumber()
                                 : this.validateIfNotRequiredInputMinLengthAndNumber();
        }

        private validateIfRequiredInputMinLengthAndNumber() {
            this.checkAndReturnRequiredResult();
            this.returnMinLengthAndNumberResult();
            
            return this.returnValidResult(true, "");
        }

        private validateIfNotRequiredInputMinLengthAndNumber() {
            if (this.value.length > 0)
                this.returnMinLengthAndNumberResult();
            
            return this.returnValidResult(true, "");
        }

        private returnMinLengthAndNumberResult() {
            if (!this.isValidNumber())
                return this.returnValidResult(false, Validation.NUMBER_ERROR_MESSAGE);

            if (!this.isValidMinLength())
                return this.returnValidResult(false, Validation.MINLENGTH_ERROR_MESSAGE(this.valueCompare));
        }
    }

    export class MaxLengthValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, valueCompare?: any, required?: boolean) {
            super(name, value, valueCompare, required);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputMaxLength() 
                                 : this.validateIfNotRequiredInputMaxLength();
        }

        private validateIfRequiredInputMaxLength() {
            this.checkAndReturnRequiredResult();

            return this.returnMaxLengthResult(this.isValidMaxLength());
        }

        private validateIfNotRequiredInputMaxLength() {
            return this.returnMaxLengthResult(this.value.length == 0 || (this.value.length > 0 && this.isValidMaxLength()));
        }

        private returnMaxLengthResult(valid: boolean) {
            return valid ? this.returnValidResult(true, "")
                         : this.returnValidResult(false, Validation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare));
        }
    }

    export class NumberAndMaxLengthValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, valueCompare?: any, required?: boolean) {
            super(name, value, valueCompare, required);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            return this.required ? this.validateIfRequiredInputMaxLengthAndNumber()
                                 : this.validateIfNotRequiredInputMaxLengthAndNumber();
        }

        private validateIfRequiredInputMaxLengthAndNumber() {
            this.checkAndReturnRequiredResult();
            this.returnMaxLengthAndNumberResult();
            
            return this.returnValidResult(true, "");
        }

        private validateIfNotRequiredInputMaxLengthAndNumber() {
            if (this.value.length > 0)
                this.returnMaxLengthAndNumberResult();

            return this.returnValidResult(true, "");
        }

        private returnMaxLengthAndNumberResult() {
            if (!this.isValidNumber())
                return this.returnValidResult(false, Validation.NUMBER_ERROR_MESSAGE);

            if (!this.isValidMaxLength())
                return this.returnValidResult(false, Validation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare));
        }
    }
    
    export class PasswordConfirmValidation extends Validation.BaseValidation {
        constructor(name: string, value: any, valueCompare?: any) {
            super(name, value, valueCompare);
            this.value = value ? value : "";
        }

        public validate() : Validation.IValidationResult {
            if (this.value == "" || this.value.length <= 0)
                return this.returnValidResult(false, Validation.REQUIRED_ERROR_MESSAGE);

            if (!this.isValidConfirmPassword())
                return this.returnValidResult(false, Validation.CONFIRMPASSWORD_ERROR_MESSAGE);
            
            return this.returnValidResult(true, "");
        }
    }
}

export default FormValidation;
