import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {SendFormService} from "../services/send-form.service";

@Injectable()
export class UsernameValidationService {
  constructor(private sendFormService: SendFormService) {}

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.sendFormService.checkIfUsernameExists(control.value).pipe(
        map(res => {
          return res ? {'emailExist': true} : null;
        })
      );
    };
  }
}
