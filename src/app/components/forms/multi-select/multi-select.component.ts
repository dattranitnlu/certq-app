import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
})
export class MultiSelectComponent {
  @Input() value: string = 'abc';
  @Input() id: string = 'defaultCheck1';
  @Input() checked: boolean = false;
  @Input() correct: boolean = false;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
}
