import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormRequest } from '../interfaces/form-request';
import { catchError, delay, EMPTY, iif, map, Observable, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private LINK = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  sendForm(formRes: FormRequest): void {
    // return this.http.post(this.LINK, formRes);

    console.log(formRes);
  }
  checkEmail(email: string): Observable<any> {
    console.log('checking email: ' + email + '...');

    const success$ = of('success');
    const fail$ = of('fail');

    return this.http.post(this.LINK + '/users/', { email })
      .pipe(
        map(
          () => iif(
            // () => (response.status === 200),
            () => (true),
            fail$,
            success$,
          )),
        catchError(() => {
          const errorMessage = 'Request error. Please try again later';
          console.log(errorMessage);
          return of(errorMessage);
        }),
      );
  }
}
