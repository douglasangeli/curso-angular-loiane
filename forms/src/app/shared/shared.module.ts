import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    FormDebugComponent,
    InputFieldComponent
  ],
  exports: [
    FormDebugComponent,
    InputFieldComponent
  ],
  providers: [

  ]
})
export class SharedModule { }
