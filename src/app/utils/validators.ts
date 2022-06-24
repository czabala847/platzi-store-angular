import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static matchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confPassword = control.get('confPassword').value;

    if (password === confPassword) {
      return null; //No hay errores
    }

    return { match_password: true };
  }
}
