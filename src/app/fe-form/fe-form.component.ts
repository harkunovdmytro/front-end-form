import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
import { SendFormService } from '../services/send-form.service';
import { Validators } from '@angular/forms';
import { FormRequest } from '../interfaces/form-request';

const getFrameworksVersions = () => ({
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
  '': []
});

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss']
})
export class FeFormComponent {
  frameworks = ['angular', 'react', 'vue'];

  frameworksVersions: { [index: string]: any } = getFrameworksVersions();
  
  hobby = new FormArray([
    this.createHobbyFormGroup()
  ]);

  form = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    dateOfBirth: new FormControl('', { validators: [Validators.required] }),
    framework: new FormControl('', { validators: [Validators.required] }),
    frameworkVersion: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    hobby: this.hobby
  });

  get currentFramework(): string {
    return (<FormControl>this.form.get('framework')).value ?? '';
  }

  get currentVersions(): string[] {
    return this.frameworksVersions[this.currentFramework];
  }

  constructor(private sendFormService: SendFormService) { }

  addHobby(event: Event): void {
    event.preventDefault();
    this.hobby.push(this.createHobbyFormGroup());
  };

  removeHobby(event: Event, id: number): void {
    event.preventDefault();
    this.hobby.removeAt(id);
  };

  postForm() {
    const formDate = new Date(Date.parse((<FormControl>this.form.get('dateOfBirth'))?.value));

    const day = formDate.getDay() + 4;
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();

    const date = (day > 9 ? day : '0' + day) + '-'
      + (month > 9 ? month : '0' + month) + '-' + year;

    const hobby = this.form.get('hobby')?.value.map((item) => ({ ...item, duration: (item.duration + ' month') }));

    this.sendFormService.sendForm(<FormRequest>{
      ...this.form.value,
      dateOfBirth: date,
      hobby: hobby,
    })
  };

  private createHobbyFormGroup() {
    return new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      duration: new FormControl('', { validators: [Validators.required] })
    }, { validators: [Validators.required] })
  }
};
