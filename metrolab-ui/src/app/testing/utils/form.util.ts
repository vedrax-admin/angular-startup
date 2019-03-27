import { FormGroup, AbstractControl } from '@angular/forms';

export function shouldBeValid(form: FormGroup, ctrlName: string, value: string):boolean {
    return testWithExpection(form, ctrlName, value, true);
}

export function shouldBeInvalid(form: FormGroup, ctrlName: string, value: string):boolean {
    return testWithExpection(form, ctrlName, value, false);
}

function testWithExpection(form: FormGroup, ctrlName: string, value: string, expectation: boolean):boolean {
    let ctrl = setCtrlValue(form, ctrlName, value);
    return ctrl.valid === expectation;
}

export function shouldHaveError(form: FormGroup, ctrlName: string, value: string, errorName: string) :boolean {
    let ctrl = setCtrlValue(form, ctrlName, value);
    let errors = ctrl.errors || {};
    return errors.hasOwnProperty(errorName);
}

export function setCtrlValue(form: FormGroup, ctrlName: string, value: string): AbstractControl {
    let ctrl = form.get(ctrlName);
    ctrl.setValue(value);
    return ctrl;
}