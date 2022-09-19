import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
    AsyncValidatorFn,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

@Injectable()
export class UsernameValidationService {
    takenUsernames = ['test@test.test'];

    checkIfUsernameExists(username: string): Observable<boolean> {
        return of(this.takenUsernames.includes(username)).pipe(delay(500));
    }

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.checkIfUsernameExists(control.value).pipe(
                map(res => {
                    return res ? { 'emailExist': true } : null;
                })
            );
        };
    }
}