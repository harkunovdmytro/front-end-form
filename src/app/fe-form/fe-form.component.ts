import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-fe-form',
  templateUrl: './fe-form.component.html',
  styleUrls: ['./fe-form.component.scss']
})
export class FeFormComponent {

  form!: FormGroup;
  hobbies: { name: string, duration: string }[] = []

  @Input() name: string = '';
  @Input() lastName: string = '';
  @Input() birthDate: string = '';
  usedTech: string = '';
  @Input() usedTechVersion: string = '';
  @Input() email: string = '';
  tech: string = 'tech'

  feTech = [
    { label: "Angular", value: "angular" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
  ]

  feTechVersion: any = {
    "angular": ['1.1.1', '1.2.1', '1.3.3'],
    "react": ['2.1.2', '3.2.4', '4.3.1'],
    "vue": ['3.3.1', '5.2.1', '5.1.3'],
    "": []
  }

  get currentVerse(): string[] {
    return this.feTechVersion[this.form.value.tech];
  }
  get currentVerseLength(): string[] {
    return this.feTechVersion[this.form.value.tech].length;
  }

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      name: "",
      lastName: "",
      birthDate: "",
      tech: "",
      techVersion: "",
      email: "",
      hobbyName: "",
      hobbyDuration: "",
      // hobbies: []
    })

    this.form.valueChanges.subscribe(console.log)
  }

  addHobby() {
    this.hobbies.push({
      name: this.form.value.hobbyName,
      duration: this.form.value.hobbyDuration + " month"
    })

  }
  removeHobby(index: number) {
    this.hobbies.splice(index, 1);
  }
}
