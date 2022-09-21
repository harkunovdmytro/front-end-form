import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {format} from 'date-fns';
import {SendFormService} from '../services/send-form.service';
import {FormRequest} from '../interfaces/form-request';
import {frameworks, frameworksVersions} from '../constants/form-constants';
import {UsernameValidationService} from '../services/fe-form-validators.service';

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss',],
  providers: [UsernameValidationService,],
})
export class FeFormComponent implements OnInit {
  frameworks: string[] = frameworks;
  frameworksVersions: { [index: string]: string[] } = frameworksVersions;

  hobbies = new FormArray([
    this.createHobbyFormGroup(),
  ]);

  form = new FormGroup({
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

  currentVersions$ = new BehaviorSubject<string[]>([]);

  constructor(
    private sendFormService: SendFormService,
    private usernameService: UsernameValidationService,
  ) {
  }

  ngOnInit() {
    this.form.controls.framework.valueChanges
      .subscribe((e: string | null) => {
        this.currentVersions$.next(this.frameworksVersions[String(e)]);
      });
  }

  isFieldValid(fieldName: string): boolean {
    return Boolean(this.form.get(fieldName)?.invalid && this.form.get(fieldName)?.touched);
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
    const hobbies = this.form.get('hobbies')?.value
      .map((item) =>
        ({
          ...item,
          duration: (item.duration + ' month'),
        }));

    this.sendFormService.sendForm(<FormRequest>{
      ...this.form.value,
      hobbies,
      dateOfBirth: format((<FormControl>this.form.get('dateOfBirth'))?.value, 'dd-MM-yyyy'),
    });
  }

  private createHobbyFormGroup() {
    return new FormGroup({
      name: new FormControl('', {validators: [Validators.required]}),
      duration: new FormControl('', {validators: [Validators.required]}),
    });
  }
}
