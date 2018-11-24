import * as _ from "lodash";
import Validation from "../validation/base-validation";

module Interaction {
    export interface IFormInteraction<T> {
        target?: any,
        elementName?: string,
        elementValue?: any,
        onBind?(name: string, value: any, bindingState: T) : T,
        onBindTarget?(eventTarget: EventTarget, bindingState: T) : T,
        onValidate?(validator: Validation.BaseValidation);
    }
    
    export class BaseInteraction {
        protected errorElementToAppend: HTMLSpanElement;

        public onStateUpdate<T>(targetName: string, targetValue: any, bindingState: T) : T {
            bindingState = _.assign({}, bindingState, { [targetName]: targetValue }) as T;
            return bindingState;
        }

        public onCheckValidDayPicker(validator: Validation.BaseValidation, name: string, selectedDay: any) {
            const validationFactory = new Validation.ValidationFactory();
            const errorMessage = validationFactory.execute(validator);
            const isValid = this.checkValidAndAppendErrorForDayPicker(errorMessage, name, selectedDay);
            return isValid;
        }

        public checkValidAndAppendErrorForDayPicker(message: string, name: string, value: any): boolean {
            return true;
        }

        public onCheckValidation(validator: Validation.BaseValidation, target: any) {
            const validationFactory = new Validation.ValidationFactory();
            const errorMessage = validationFactory.execute(validator);
            const isValid = this.checkValidAndShowErrorMessage(errorMessage, target);
            return isValid;
        }

        public checkValidAndShowErrorMessage(errorMessage: string, target: any): boolean {
            if (errorMessage != "")
                return this.setElementIsNotValidIfErrorMessageIsNotEmpty(errorMessage, target);
            else
                return this.setElementValidIfErrorMessageIsEmpty(target);
        }

        private setElementValidIfErrorMessageIsEmpty(target: any) {
            const existingErrorElement = target.nextElementSibling;

            if (existingErrorElement != null) {
                if (existingErrorElement.classList.contains("has-errors"))
                    existingErrorElement.remove();
                
                const nextExistingErrorElement = existingErrorElement.nextElementSibling;

                if (nextExistingErrorElement != null &&
                    existingErrorElement.classList.contains("required"))
                    nextExistingErrorElement.remove();
            }
            
            return true;
        }

        private setElementIsNotValidIfErrorMessageIsNotEmpty(errorMessage: string, target: any) {
            const existingErrorElement = target.nextElementSibling;
            
            this.createErrorElementToAppend(errorMessage);

            if (existingErrorElement != null) {
                if (existingErrorElement.classList.contains("required")) {
                    if (existingErrorElement.nextElementSibling != null)
                        existingErrorElement.nextElementSibling.remove();
                    
                    existingErrorElement.insertAdjacentElement("afterend", this.errorElementToAppend);
                }                   
            }
            else {
                target.insertAdjacentElement("afterend", this.errorElementToAppend);
            }
            return false;
        }

        private createErrorElementToAppend(errorMessage: string) {
            this.errorElementToAppend = document.createElement("span");
            this.errorElementToAppend.innerText = errorMessage;
            this.errorElementToAppend.classList.add("has-errors");
        }
    }
}

export default Interaction;
