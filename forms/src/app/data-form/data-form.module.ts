import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataFormComponent } from './data-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  declarations: [
    DataFormComponent
  ],
  providers: [
    FormBuilder
  ]
})
export class DataFormModule { }
