export var FormValidation;
(function (FormValidation) {
    FormValidation.EMAIL_ERROR_MESSAGE = "Email không hợp lệ. ";
    FormValidation.NUMBER_ERROR_MESSAGE = "Vui lòng nhập số. ";
    FormValidation.REQUIRED_ERROR_MESSAGE = "Vui lòng nhập dữ liệu. ";
    FormValidation.CONFIRMPASSWORD_ERROR_MESSAGE = "Mật khẩu xác nhận không đúng. ";
    FormValidation.MAXLENGTH_ERROR_MESSAGE = (value) => { return `Vui lòng nhập tối đa ${value} ký tự. `; };
    FormValidation.MINLENGTH_ERROR_MESSAGE = (value) => { return `Vui lòng nhập tối thiểu ${value} ký tự. `; };
    let ValidationType;
    (function (ValidationType) {
        ValidationType[ValidationType["Email"] = 0] = "Email";
        ValidationType[ValidationType["Number"] = 1] = "Number";
        ValidationType[ValidationType["Required"] = 2] = "Required";
        ValidationType[ValidationType["MinLength"] = 3] = "MinLength";
        ValidationType[ValidationType["MaxLength"] = 4] = "MaxLength";
        ValidationType[ValidationType["Password"] = 5] = "Password";
        ValidationType[ValidationType["ConfirmPassword"] = 6] = "ConfirmPassword";
    })(ValidationType = FormValidation.ValidationType || (FormValidation.ValidationType = {}));
    class ValidationFactory {
        execute(validator) {
            let result = validator.validate();
            return result.errorMessage;
        }
    }
    FormValidation.ValidationFactory = ValidationFactory;
    class BaseValidation {
        constructor(name, value, required, valueCompare) {
            this.name = name;
            this.value = value;
            this.required = required;
            this.valueCompare = valueCompare;
        }
        validate() {
            return { isValid: true, errorMessage: "" };
        }
    }
    FormValidation.BaseValidation = BaseValidation;
    class RequiredValidation extends BaseValidation {
        constructor(name, value) {
            super(name, value);
        }
        validate() {
            let errorMessage = "";
            let valid = this.value != "" && this.value != undefined;
            errorMessage = !valid ? FormValidation.REQUIRED_ERROR_MESSAGE : "";
            return { isValid: valid, errorMessage: errorMessage };
        }
    }
    FormValidation.RequiredValidation = RequiredValidation;
    class EmailValidation extends BaseValidation {
        constructor(name, value, required) {
            super(name, value, required);
        }
        validate() {
            let requireValid = true;
            let emailValid = true;
            if (this.required != undefined && this.required) {
                requireValid = this.value != "" && this.value != undefined;
                if (!requireValid) {
                    return { isValid: requireValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                emailValid = requireValid && this.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (!emailValid) {
                    return { isValid: emailValid, errorMessage: FormValidation.EMAIL_ERROR_MESSAGE };
                }
                return { isValid: true, errorMessage: "" };
            }
            else {
                emailValid = this.value.length == 0 || (this.value.length > 0 && this.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
                let errorMessage = !emailValid ? FormValidation.EMAIL_ERROR_MESSAGE : "";
                return { isValid: emailValid, errorMessage: errorMessage };
            }
        }
    }
    FormValidation.EmailValidation = EmailValidation;
    class NumberValidation extends BaseValidation {
        constructor(name, value, required) {
            super(name, value, required);
        }
        validate() {
            let numberValid = true;
            let requiredValid = true;
            if (this.required != undefined && this.required) {
                requiredValid = this.value != "" && this.value != undefined;
                if (!requiredValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                numberValid = requiredValid && !isNaN(this.value);
                if (!numberValid) {
                    return { isValid: numberValid, errorMessage: FormValidation.NUMBER_ERROR_MESSAGE };
                }
                return { isValid: true, errorMessage: "" };
            }
            else {
                numberValid = this.value.length == 0 || (this.value.length > 0 && !isNaN(this.value));
                let errorMessage = !numberValid ? FormValidation.NUMBER_ERROR_MESSAGE : "";
                return { isValid: numberValid, errorMessage: errorMessage };
            }
        }
    }
    FormValidation.NumberValidation = NumberValidation;
    class MinLengthValidation extends BaseValidation {
        constructor(name, value, valueCompare, required) {
            super(name, value, valueCompare, required);
        }
        validate() {
            let minLengthValid = true;
            let requiredValid = true;
            if (this.required != undefined && this.required) {
                requiredValid = this.value != "" && this.value != undefined;
                if (!requiredValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                minLengthValid = requiredValid && this.value.length > this.valueCompare;
                if (!minLengthValid) {
                    return { isValid: minLengthValid, errorMessage: FormValidation.MINLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
                return { isValid: true, errorMessage: "" };
            }
            else {
                minLengthValid = this.value.length == 0 || (this.value.length > 0 && this.value.length > this.valueCompare);
                let errorMessage = !minLengthValid ? FormValidation.MINLENGTH_ERROR_MESSAGE(this.valueCompare) : "";
                return { isValid: minLengthValid, errorMessage: errorMessage };
            }
        }
    }
    FormValidation.MinLengthValidation = MinLengthValidation;
    class MaxLengthValidation extends BaseValidation {
        constructor(name, value, valueCompare, required) {
            super(name, value, valueCompare, required);
        }
        validate() {
            let maxLengthValid = true;
            let requiredValid = true;
            if (this.required != undefined && this.required) {
                requiredValid = this.value != "" && this.value != undefined;
                if (!requiredValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                maxLengthValid = requiredValid && this.value.length < this.valueCompare;
                if (!maxLengthValid) {
                    return { isValid: maxLengthValid, errorMessage: FormValidation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
                return { isValid: true, errorMessage: "" };
            }
            else {
                maxLengthValid = this.value.length == 0 || (this.value.length > 0 && this.value.length < this.valueCompare);
                let errorMessage = !maxLengthValid ? FormValidation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare) : "";
                return { isValid: maxLengthValid, errorMessage: errorMessage };
            }
        }
    }
    FormValidation.MaxLengthValidation = MaxLengthValidation;
    class ConfirmPasswordValidation extends BaseValidation {
        constructor(name, value, valueCompare) {
            super(name, value, valueCompare);
        }
        validate() {
            let errorMessage = "";
            let valid = (this.value != "" && this.value != undefined) && (this.value == this.valueCompare);
            errorMessage = !valid ? FormValidation.CONFIRMPASSWORD_ERROR_MESSAGE : "";
            return { isValid: valid, errorMessage: errorMessage };
        }
    }
    FormValidation.ConfirmPasswordValidation = ConfirmPasswordValidation;
})(FormValidation || (FormValidation = {}));
//# sourceMappingURL=validation.js.map