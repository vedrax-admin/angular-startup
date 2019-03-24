import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export function shouldBeValid(form: FormGroup, ctrlName: string, value: string) {
    isValid(form, ctrlName, value, true);
}

export function shouldBeInvalid(form: FormGroup, ctrlName: string, value: string) {
    isValid(form, ctrlName, value, false);
}

function isValid(form: FormGroup, ctrlName: string, value: string, expectation: boolean) {
    let ctrl = setCtrlValue(form, ctrlName, value);
    expect(ctrl.valid).toBe(expectation);
}

export function shouldHaveError(form: FormGroup, ctrlName: string, value: string, errorName: string) {
    let ctrl = setCtrlValue(form, ctrlName, value);
    let errors = ctrl.errors || {};
    expect(errors[errorName]).toBeTruthy();
}

export function setCtrlValue(form: FormGroup, ctrlName: string, value: string): AbstractControl {
    let ctrl = form.get(ctrlName);
    ctrl.setValue(value);
    return ctrl;
}