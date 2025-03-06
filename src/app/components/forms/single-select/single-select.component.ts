import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true,
    },
  ],
})
export class SingleSelectComponent implements ControlValueAccessor {
  @Input() name: string = 'default-radio-1';
  @Input() value: string = 'vcc';
  @Input() id: string = 'defaultRadio1';
  @Input() checked: boolean = false;
  @Input() correct: boolean = false;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() formControlName: any;

  // Internal value for the control
  private innerValue: any;

  // Functions provided by Angular to communicate with the parent form
  private onChange = (value: any) => {
    console.log('value changed = ', value);
    this.value = value;
  };
  private onTouched = () => {};

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Method to handle changes
  onSelect(value: any) {
    this.checked = true;
    this.innerValue = value;
    this.onChange(value); // Call Angular's change detection
  }
}
