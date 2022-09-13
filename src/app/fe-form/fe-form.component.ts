import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SendFormService } from '../services/send-form.service';
import { Validators } from '@angular/forms';
import { FormRequest } from '../interfaces/form-request';
import { frameworks, frameworksVersions } from '../constants';

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss'],
})
export class FeFormComponent {

  frameworks: string[] = frameworks;
  frameworksVersions: { [index: string]: string[] } = frameworksVersions;

  hobbies = new FormArray([
    this.createHobbyFormGroup(),
  ]);

  form = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    dateOfBirth: new FormControl('', { validators: [Validators.required] }),
    framework: new FormControl('', { validators: [Validators.required] }),
    frameworkVersion: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    hobbies: this.hobbies,
  });

  get currentFramework(): string {
    return (<FormControl>this.form.get('framework')).value ?? '';
  };

  get currentVersions(): string[] {
    return this.frameworksVersions[this.currentFramework];
  };

  constructor(private sendFormService: SendFormService) { };

  isFieldValid(fieldName: string): boolean {
    return Boolean(this.form.get(fieldName)?.invalid && this.form.get(fieldName)?.touched);
  };

  addHobby(event: Event): void {
    event.preventDefault();
    this.hobbies.push(this.createHobbyFormGroup());
  };

  removeHobby(event: Event, id: number): void {
    event.preventDefault();
    this.hobbies.removeAt(id);
  };

  postForm(): void {
    const formDate = new Date(Date.parse((<FormControl>this.form.get('dateOfBirth'))?.value));

    const day = formDate.getDay() + 4;
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();

    const date = (day > 9 ? day : '0' + day) + '-'
      + (month > 9 ? month : '0' + month) + '-' + year;

    const hobbies = this.form.get('hobbies')?.value.map((item) => ({ ...item, duration: (item.duration + ' month') }));

    this.sendFormService.sendForm(<FormRequest>{
      ...this.form.value,
      dateOfBirth: date,
      hobbies,
    });
  };

  private createHobbyFormGroup() {
    return new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      duration: new FormControl('', { validators: [Validators.required] })
    }, { validators: [Validators.required] });
  };

  private formatDate(strDate: string): string {
    const formDate = new Date(Date.parse(strDate));

    const day = formDate.getDay() + 4;
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();

    const date = (day > 9 ? day : '0' + day) + '-'
      + (month > 9 ? month : '0' + month) + '-' + year;

    return date;
  };
};
