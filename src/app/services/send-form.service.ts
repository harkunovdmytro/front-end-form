import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormRequest } from '../interfaces/form-request';
@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private LINK = 'http://localhost:4200';

  // constructor(private http: HttpClient) { }


  sendForm(formRes: FormRequest): void {
    // return this.http.post(this.LINK, formRes);

    console.log(formRes);
  }

}
