import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() valid = false;
  @Input() isReadOnly = false;

  private _innerValue: any = '';

  get value() {
    return this._innerValue;
  }

  set value(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.onChange(v);
    }
  }

  onChange: (_: any) => void = () => { };
  onTouched: () => void = () => { };

  onBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
