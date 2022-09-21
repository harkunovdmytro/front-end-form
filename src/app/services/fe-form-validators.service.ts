import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {SendFormService} from "./send-form.service";

@Injectable()
export class UsernameValidationService {
  constructor(private sendFormService: SendFormService) {
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.sendFormService.checkIfUsernameExists(control.value)
        .pipe(
          map(
            (validationResult): ValidationErrors | null =>
              validationResult ? {'emailExist': true} : null
          )
        )
    }
  }
}
