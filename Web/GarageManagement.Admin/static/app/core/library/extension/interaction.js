import * as _ from "lodash";
import moment from "moment";
import { FormValidation } from "../extension/validation";
export var UserInteraction;
(function (UserInteraction) {
    class BaseInteraction {
        bindReceive(targetName, targetValue, bindingState) {
            bindingState = _.assign({}, bindingState, { [targetName]: targetValue });
            return bindingState;
        }
        checkValidAndAppendErrorForTarget(message, target) {
            if (message != "") {
                if (target.nextElementSibling != null)
                    target.nextElementSibling.remove();
                this.errorElement = document.createElement("span");
                this.errorElement.innerText = message;
                this.errorElement.classList.add("has-errors");
                target.insertAdjacentElement("afterend", this.errorElement);
                return false;
            }
            else {
                if (target.nextElementSibling != null)
                    target.nextElementSibling.remove();
                return true;
            }
        }
        checkValidAndAppendError(message, name, value) {
            return true;
        }
    }
    UserInteraction.BaseInteraction = BaseInteraction;
    class InputInteraction {
        constructor() {
            this.validateMessage = "";
            this.onReceiveTarget = (eventTarget, bindingState) => {
                let target = eventTarget;
                let targetName = target.name;
                let targetType = target.type;
                this.target = target;
                if (targetType == "checkbox" || targetType == "radiobutton")
                    return new BaseInteraction().bindReceive(targetName, target.checked, bindingState);
                else if (targetType == "text" || targetType == "password" || targetType == "date" || targetType == "number" || targetType == "email")
                    return new BaseInteraction().bindReceive(targetName, target.value, bindingState);
            };
            this.onValidate = (validator) => {
                let validationFactory = new FormValidation.ValidationFactory();
                let errorMessage = validationFactory.execute(validator);
                let isValid = new BaseInteraction().checkValidAndAppendErrorForTarget(errorMessage, this.target);
                return isValid;
            };
        }
    }
    UserInteraction.InputInteraction = InputInteraction;
    class SelectInteraction {
        constructor() {
            this.onReceiveTarget = (eventTarget, bindingState) => {
                let target = eventTarget;
                this.target = target;
                return new BaseInteraction().bindReceive(target.name, target.value, bindingState);
            };
            this.onValidate = (validator) => {
                let validationFactory = new FormValidation.ValidationFactory();
                let errorMessage = validationFactory.execute(validator);
                let isValid = new BaseInteraction().checkValidAndAppendErrorForTarget(errorMessage, this.target);
                return isValid;
            };
        }
    }
    UserInteraction.SelectInteraction = SelectInteraction;
    class DayPickerInteraction {
        constructor() {
            this.validateMessage = "";
            this.onReceive = (name, selectedDay, bindingState) => {
                this.name = name;
                this.selectedDay = selectedDay = moment(selectedDay).format("DD/MM/YYYY");
                return new BaseInteraction().bindReceive(name, selectedDay, bindingState);
            };
            this.onValidate = (validator) => {
                let validationFactory = new FormValidation.ValidationFactory();
                let errorMessage = validationFactory.execute(validator);
                let isValid = new BaseInteraction().checkValidAndAppendError(errorMessage, this.name, this.selectedDay);
                return isValid;
            };
        }
    }
    UserInteraction.DayPickerInteraction = DayPickerInteraction;
})(UserInteraction || (UserInteraction = {}));
//# sourceMappingURL=interaction.js.map