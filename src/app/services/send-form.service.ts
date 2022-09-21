import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormRequest} from '../interfaces/form-request';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private authorizedUserEmails = ['test@test.test'];
  private LINK = 'http://localhost:4200';

  constructor(private http: HttpClient) {
  }

  sendForm(formRes: FormRequest): void {
    // return this.http.post(this.LINK, formRes);

    this.authorizedUserEmails.push(formRes.email);
    console.log(formRes);
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    return of(this.authorizedUserEmails.includes(username)).pipe(delay(500));
  }
}
