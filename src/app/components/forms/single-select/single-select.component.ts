import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css',
})
export class SingleSelectComponent {
  @Input() name: string = 'default-radio-1';
  @Input() value: string = 'vcc';
  @Input() id: string = 'defaultRadio1';
  @Input() checked: boolean = false;
  @Input() correct: boolean = false;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
}
