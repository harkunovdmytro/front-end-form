import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormRequest } from '../interfaces/form-request';
import { catchError, delay, EMPTY, iif, map, Observable, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private AUTHORIZED_USER_EMAILS = ['test@test.test'];
  private LINK = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  sendForm(formRes: FormRequest): void {
    // return this.http.post(this.LINK, formRes);

    console.log(formRes);
    this.AUTHORIZED_USER_EMAILS.push(formRes.email)
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    return of(this.AUTHORIZED_USER_EMAILS.includes(username)).pipe(delay(500));
  }
}
