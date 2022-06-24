import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '../core/services/categories.service';
import { map } from 'rxjs/operators';

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

  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;

      return service.checkCategory(value).pipe(
        map((response) => {
          const isAvailable = response.isAvailable;

          if (!isAvailable) {
            return { not_available: true };
          }

          return null;
        })
      );
    };
  }
}
