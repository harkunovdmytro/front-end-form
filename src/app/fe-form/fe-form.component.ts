import {Component} from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {format} from 'date-fns';
import {SendFormService} from '../services/send-form.service';
import {FormRequest} from '../interfaces/form-request';
import {frameworks, frameworksVersions} from '../constants/form-constants';
import {FEFormValidationService} from '../services/fe-form-validators.service';

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss',],
  providers: [FEFormValidationService,],
})
export class FeFormComponent {
  frameworks = frameworks;
  frameworksVersions: { [index: string]: string[] } = frameworksVersions;

  hobbies = new FormArray([
    this.createHobbyFormGroup(),
  ]);

  frontEndAuthorizationForm = new FormGroup({
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    dateOfBirth: new FormControl('', {validators: [Validators.required]}),
    framework: new FormControl('', {validators: [Validators.required]}),
    frameworkVersion: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl(
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.usernameService.usernameValidator()],
      },
    ),
    hobbies: this.hobbies,
  });

  constructor(
    private sendFormService: SendFormService,
    private usernameService: FEFormValidationService,
  ) {
  }

  isFieldValid(fieldName: string): boolean {
    return Boolean(this.frontEndAuthorizationForm.get(fieldName)?.invalid && this.frontEndAuthorizationForm.get(fieldName)?.touched);
  }

  addHobby(event: Event): void {
    event.preventDefault();
    this.hobbies.push(this.createHobbyFormGroup());
  }

  removeHobby(event: Event, id: number): void {
    event.preventDefault();
    this.hobbies.removeAt(id);
  }

  postForm(): void {
    const hobbies = this.frontEndAuthorizationForm.get('hobbies')?.value
      .map(item =>
        ({
          ...item,
          duration: item.duration + ' month',
        }));

    this.sendFormService.sendForm(<FormRequest>{
      ...this.frontEndAuthorizationForm.value,
      hobbies,
      dateOfBirth: format((<FormControl>this.frontEndAuthorizationForm.get('dateOfBirth'))?.value, 'dd-MM-yyyy'),
    });
  }

  private createHobbyFormGroup(): FormGroup<{ name: FormControl, duration: FormControl }> {
    return new FormGroup({
      name: new FormControl('', {validators: [Validators.required]}),
      duration: new FormControl('', {validators: [Validators.required]}),
    });
  }
}
