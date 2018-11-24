import * as _ from "lodash";
import moment from "moment";
import Interaction from "./base-interaction";
import Validation from "../validation/base-validation";

module FormInteraction {

    export abstract class BaseInputInteraction<T> implements Interaction.IFormInteraction<T> {
        public target : any;
        protected targetType : string;

        protected isInputType() : boolean {
            const inputTypes = [ "text", "password", "date", "number", "email" ];
            return inputTypes.some(x => x == this.targetType);
        }

        protected isCheckingType() : boolean {
            const inputTypes = [ "checkbox", "radiobutton" ];
            return inputTypes.some(x => x == this.targetType);
        }

        protected isTextArea() : boolean {
            return this.targetType == "textarea";
        }
    }
    
    export class InputInteraction<T> extends BaseInputInteraction<T> {
        
        public onBind(name: string, value: any, bindingState: T) {
            return new Interaction.BaseInteraction().onStateUpdate<T>(name, value, bindingState);
        }  

        public onBindTarget(eventTarget: EventTarget, bindingState: T) {
            let targetValue;
            this.target = eventTarget as HTMLInputElement;
            
            if (this.isTextArea())
                this.target = eventTarget as HTMLTextAreaElement;

            this.targetType = this.target.type;

            if (this.isCheckingType())
                targetValue = this.target.checked;
            
            if (this.isInputType() || this.isTextArea())
                targetValue = this.target.value;

            return new Interaction.BaseInteraction().onStateUpdate<T>(this.target.name, targetValue, bindingState);
        }   
        
        public onValidate(validator: Validation.BaseValidation) {
            return new Interaction.BaseInteraction().onCheckValidation(validator, this.target);
        }
    }
    
    export class SelectInteraction<T> implements Interaction.IFormInteraction<T> {
        public target: any;
        
        public onBind(name: string, value: any, bindingState: T) {
            return new Interaction.BaseInteraction().onStateUpdate<T>(name, value, bindingState);
        }

        public onBindTarget(eventTarget: EventTarget, bindingState: T) {
            this.target = eventTarget as HTMLSelectElement;
            return new Interaction.BaseInteraction().onStateUpdate<T>(this.target.name, this.target.value, bindingState);
        }

        public onValidate(validator: Validation.BaseValidation) {
            return new Interaction.BaseInteraction().onCheckValidation(validator, this.target);
        }
    }
    
    export class DayPickerInteraction<T> implements Interaction.IFormInteraction<T> {
        public name: string;
        public selectedDay: any;
        
        public onBind(name: string, selectedDay: any, bindingState: T) {
            this.name = name;
            this.selectedDay = selectedDay = moment(selectedDay).format("DD/MM/YYYY");
            return new Interaction.BaseInteraction().onStateUpdate<T>(name, selectedDay, bindingState);
        }   
        
        public onValidate(validator: Validation.BaseValidation) {
            return new Interaction.BaseInteraction().onCheckValidDayPicker(validator, this.name, this.selectedDay);
        }
    }
}

export default FormInteraction;
