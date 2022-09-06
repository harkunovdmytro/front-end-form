import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from "@angular/forms"
import { SendFormService } from "../send-form.service";

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss']
})
export class FeFormComponent implements OnInit {
  form!: FormGroup;
  hobbies!: FormArray;
  frameworks = [
    "angular",
    "react",
    "vue",
  ]

  frameworksVersions: { [index: string]: any } = {
    "angular": ['1.1.1', '1.2.1', '1.3.3'],
    "react": ['2.1.2', '3.2.4', '4.3.1'],
    "vue": ['3.3.1', '5.2.1', '5.1.3'],
    "": []
  }

  get currentFramework(): string {
    return (<FormControl>this.form.get("framework")).value ?? "";
  }

  get currentVersions(): string[] {
    return this.frameworksVersions[this.currentFramework];
  }

  constructor(private sendFormService:SendFormService) { }

  ngOnInit(): void {
    this.hobbies = new FormArray([
      this.createHobbyFormGroup()
    ])

    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      dateOfBirth: new FormControl(""),
      framework: new FormControl(""),
      frameworkVersion: new FormControl(""),
      email: new FormControl(""),
      hobbies: this.hobbies
    })
  }

  addHobby() {
    this.hobbies.push(this.createHobbyFormGroup())
  }

  createHobbyFormGroup() {
    return new FormGroup({
      name: new FormControl(""),
      duration: new FormControl("")
    })
  }

  postForm() {
    this.sendFormService.sendForm(this.form.value)
  }
}
