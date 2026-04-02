import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Requires min 8 chars, at least one uppercase letter, and one number. */
export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  const errors: ValidationErrors = {};

  if (value.length < 8) errors['minLength'] = true;
  if (!/[A-Z]/.test(value)) errors['missingUppercase'] = true;
  if (!/[0-9]/.test(value)) errors['missingNumber'] = true;

  return Object.keys(errors).length ? errors : null;
}
