import Dictionary from "../library/dictionary";
import AppCommon from "./base-component";
import ToastHelper from "../../component/common-helper/toast-helper";
import FormInteraction from "../interaction/form-interaction";
import FormValidation from "../validation/form-validation";
import Validation from "../validation/base-validation";

export interface IFormComponent {
    onSave: (event: any) => any;
    setInitialErrors?: (effectForAllValues?: boolean) => void;
}

export interface ValidWise {
    IsValid?: boolean;
}

export interface FormWise {
    closeModal?: any;
    create?(entry: any): any;
    edit?(entry: any): any;
}

export abstract class BaseFormComponent<P, FS extends ValidWise, S> 
        extends AppCommon.BaseComponent<P, FS> implements IFormComponent {
    
    protected originalState: FS;
    protected readonly errors: Dictionary.IKeyedCollection<boolean>;
    protected readonly inputInteraction: FormInteraction.InputInteraction<S>;
    protected readonly selectInteraction: FormInteraction.SelectInteraction<S>;
    protected readonly dayPickerInteraction: FormInteraction.DayPickerInteraction<S>;
    
    constructor(props: P, state: FS) {
        super(props, state);

        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<S>();
        this.selectInteraction = new FormInteraction.SelectInteraction<S>();
        this.dayPickerInteraction = new FormInteraction.DayPickerInteraction<S>();

        this.setInitialErrors();
    }
    
    public abstract setInitialErrors(effectForAllValues?): void;

    public abstract onSave(event: any);
    
    protected handleResponseFromServerForCreateAction(currentTarget: any, newTarget: any, callBack?: any, errorMessageCallback?: () => void) {
        this.handleSavingFailSuccess(currentTarget, newTarget, "Tạo mới", callBack, errorMessageCallback);
    }

    protected handleResponseFromServerForEditAction(currentTarget: any, newTarget: any, callBack?: any, errorMessageCallback?: () => void) {
        this.handleSavingFailSuccess(currentTarget, newTarget, "Cập nhật", callBack, errorMessageCallback);
    }
    
    protected triggerValidation(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        if (validationFunc != undefined) {
            const target = event.target;
            return () => validationFunc(target.name, target.value, required, valueToCompare);
        }
    }
    
    protected validateRequiredForSelect(name: string, value: any) {
        this.validateSelectElement(new FormValidation.RequiredValidation(name, value));
    }
    
    protected validateRequiredForInput(name: string, value: any) {
        this.validateInputElement(new FormValidation.RequiredValidation(name, value));
    }

    protected validateNumberForInput(name: string, value: any, required?: boolean) {
        this.validateInputElement(new FormValidation.NumberValidation(name, value, required));
    }

    protected validateEmailForInput(name: string, value: any, required?: boolean) {
        this.validateInputElement(new FormValidation.EmailValidation(name, value, required));
    }

    protected validateMinLengthForInput(name: string, value: any, required?: boolean) {
        this.validateInputElement(new FormValidation.MinLengthValidation(name, value, required));
    }

    protected validateNumberAndMinLengthForInput(name: string, value: any, required: boolean, valueCompare: any) {
        this.validateInputElement(new FormValidation.NumberAndMinLengthValidation(name, value, required, valueCompare));
    }

    protected validateMaxLengthForInput(name: string, value: any, required?: boolean) {
        this.validateInputElement(new FormValidation.MaxLengthValidation(name, value, required));
    }

    protected validateNumberAndMaxLengthForInput(name: string, value: any, required: boolean, valueCompare: any) {
        this.validateInputElement(new FormValidation.NumberAndMaxLengthValidation(name, value, required, valueCompare));
    }

    private validateSelectElement(validation: Validation.BaseValidation) {
        const isValid = this.selectInteraction.onValidate(validation);
        this.checkValidOnEveryChange(name, isValid);
    }

    private validateInputElement(validation: Validation.BaseValidation) {
        const isValid = this.inputInteraction.onValidate(validation);
        this.checkValidOnEveryChange(name, isValid);
    }

    private checkValidOnEveryChange(name: string, valid: boolean) {
        this.errors.setValue(name, valid);
        this.setState({ IsValid: this.errors.findByValues(false).length === 0 });
    }
    
    private handleSavingFailSuccess(currentTarget: any, newTarget: any, module: string, callBack?: any, errorMessageCallback?: () => void) {
        if (currentTarget === newTarget) {
            return;
        }

        if (newTarget.Success) {
            ToastHelper.notifySuccess(`${module} thành công!`);
        } else {
            const errorMessage = newTarget.Message[0].ErrorMessage;

            if (errorMessageCallback) {
                errorMessageCallback();
            } else {
                ToastHelper.notifyWarning(`${module} thất bại. Lỗi: ${errorMessage}`);
            }
        }
        setTimeout(() => callBack(), 1500);
    }
}

export abstract class GeneralFormComponent<P extends FormWise, FS extends ValidWise, S>
        extends BaseFormComponent<P, FS, S> {
    
    constructor(props: P, state: FS) {
        super(props, state);
        this.closePopup = this.closePopup.bind(this);
    }
    
    protected onCreateOrUpdate<S>(event: any, id: number | string, state: S) {
        event.preventDefault();

        if (!this.state.IsValid)
            return;

        if ((typeof id === "number" && id === 0) ||
            (typeof id === "string" && id === "")) {
            this.props.create(state);
        } else {
            this.props.edit(state);
        }
    }
    
    protected closePopup() {
        if (this.props.closeModal)
            this.props.closeModal();
    }
}
