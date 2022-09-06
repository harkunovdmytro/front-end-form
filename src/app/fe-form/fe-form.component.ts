import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SendFormService } from "../send-form.service";

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss'],
  providers: [SendFormService]
})
export class FeFormComponent {

  form!: FormGroup;

  hobbies: { name: string, duration: string }[] = []


  feFrameworks = [
    { label: "Angular", value: "angular" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
  ]

  feFrameworkVersion: any = {
    "angular": ['1.1.1', '1.2.1', '1.3.3'],
    "react": ['2.1.2', '3.2.4', '4.3.1'],
    "vue": ['3.3.1', '5.2.1', '5.1.3'],
    "": []
  }

  get currentVerse(): string[] {
    return this.feFrameworkVersion[this.form.value.framework];
  }
  get currentVerseLength(): string[] {
    return this.feFrameworkVersion[this.form.value.framework].length;
  }

  constructor(private fb: FormBuilder, private sendFormService: SendFormService) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      dateOfBirth: new FormControl(""),
      framework: new FormControl(""),
      frameworkVersion: new FormControl(""),
      email: new FormControl(""),
      hobbyName: new FormControl(""),
      hobbyDuration: new FormControl(""),
    })
  }

  createHobbyFormControl(): FormGroup {
    return new FormGroup({
      name: this.fb.control("footbal"),
      duration: this.fb.control("two month")
    })
  }

  addHobby(event: Event) {
    event.preventDefault();

    if (this.form.get("hobbyName")?.value && this.form.get("hobbyDuration")?.value)
      this.hobbies.push({
        name: this.form.value.hobbyName,
        duration: this.form.value.hobbyDuration + " month"
      });

      this.form.get("hobbyName")?.reset()
      this.form.get("hobbyDuration")?.reset()
  }

  removeHobby(index: number) {
    this.hobbies.splice(index, 1);
  }

  onSubmit() {
    if (this.form.valid) {
      this.sendFormService.sendForm({
        ...this.form.value,
        hobbies: this.hobbies
      })
    }
  }
}
