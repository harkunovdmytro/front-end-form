import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private LINK = "http://localhost:4200";

  // constructor(private http: HttpClient) { }


  sendForm(formRes: any) {
    const formDate = new Date(Date.parse(formRes.dateOfBirth))

    const day = formDate.getDay() + 4;
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();

    const date = (day > 9 ? day : "0" + day) + "-"
      + (month > 9 ? month : "0" + month) + "-" + year;

    const formValues = {
      firstName: formRes.firstName,
      lastName: formRes.lastName,
      dateOfBirth: date,
      framework: formRes.framework,
      frameworkVersion: formRes.frameworkVersion,
      email: formRes.email,
      hobby: formRes.hobbies
    }

    // return this.http.post(this.LINK, formRes);

    console.log(formValues)
  }

}
