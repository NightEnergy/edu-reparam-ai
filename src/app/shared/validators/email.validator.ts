import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return valid ? null : { invalidEmail: true };
}
