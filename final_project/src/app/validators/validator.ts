import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function capitalLetterValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      const startsWithUppercase = /^[A-Z]/.test(control.value);
      resolve(startsWithUppercase ? null : { 'startsWithUppercase': true });
    });
  };
}
