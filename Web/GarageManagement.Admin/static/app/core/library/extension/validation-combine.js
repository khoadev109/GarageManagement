import { FormValidation } from "../extension/validation";
export var FormValidationCombine;
(function (FormValidationCombine) {
    class MinLengthAndNumberValidation extends FormValidation.BaseValidation {
        constructor(name, value, valueCompare, required) {
            super(name, value, valueCompare, required);
        }
        validate() {
            let errorMessage = "";
            let numberValid = true;
            let requiredValid = true;
            let minLengthValid = true;
            if (this.required != undefined && this.required) {
                requiredValid = this.value != "" && this.value != undefined;
                if (!requiredValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                numberValid = requiredValid && !isNaN(this.value);
                if (!numberValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.NUMBER_ERROR_MESSAGE };
                }
                minLengthValid = requiredValid && this.value.length >= this.valueCompare;
                if (!minLengthValid) {
                    return { isValid: minLengthValid, errorMessage: FormValidation.MINLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
            }
            else {
                numberValid = this.value.length == 0 || (this.value.length > 0 && !isNaN(this.value));
                if (!numberValid) {
                    return { isValid: numberValid, errorMessage: FormValidation.NUMBER_ERROR_MESSAGE };
                }
                minLengthValid = this.value.length == 0 || (this.value.length > 0 && this.value.length >= this.valueCompare);
                if (!minLengthValid) {
                    return { isValid: minLengthValid, errorMessage: FormValidation.MINLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
            }
            return { isValid: true, errorMessage: "" };
        }
    }
    FormValidationCombine.MinLengthAndNumberValidation = MinLengthAndNumberValidation;
    class MaxLengthAndNumberValidation extends FormValidation.BaseValidation {
        constructor(name, value, valueCompare, required) {
            super(name, value, valueCompare, required);
        }
        validate() {
            let errorMessage = "";
            let numberValid = true;
            let requiredValid = true;
            let maxLengthValid = true;
            if (this.required != undefined && this.required) {
                requiredValid = this.value != "" && this.value != undefined;
                if (!requiredValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.REQUIRED_ERROR_MESSAGE };
                }
                numberValid = requiredValid && !isNaN(this.value);
                if (!numberValid) {
                    return { isValid: requiredValid, errorMessage: FormValidation.NUMBER_ERROR_MESSAGE };
                }
                maxLengthValid = requiredValid && this.value.length <= this.valueCompare;
                if (!maxLengthValid) {
                    return { isValid: maxLengthValid, errorMessage: FormValidation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
            }
            else {
                numberValid = this.value.length == 0 || (this.value.length > 0 && !isNaN(this.value));
                if (!numberValid) {
                    return { isValid: numberValid, errorMessage: FormValidation.NUMBER_ERROR_MESSAGE };
                }
                maxLengthValid = this.value.length == 0 || (this.value.length > 0 && this.value.length <= this.valueCompare);
                if (!maxLengthValid) {
                    return { isValid: maxLengthValid, errorMessage: FormValidation.MAXLENGTH_ERROR_MESSAGE(this.valueCompare) };
                }
            }
            return { isValid: true, errorMessage: "" };
        }
    }
    FormValidationCombine.MaxLengthAndNumberValidation = MaxLengthAndNumberValidation;
})(FormValidationCombine || (FormValidationCombine = {}));
//# sourceMappingURL=validation-combine.js.map