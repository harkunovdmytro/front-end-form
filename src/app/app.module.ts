import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { FeFormComponent } from './fe-form/fe-form.component';


import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    FeFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    MatSelectModule,
    // NgxMatSelectSearchModule,
  ],
  exports: [MatInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
