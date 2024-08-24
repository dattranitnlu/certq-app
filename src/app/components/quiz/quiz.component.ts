import { Component, Input, OnInit } from '@angular/core';
import { SingleSelectComponent } from '../forms/single-select/single-select.component';
import { MultiSelectComponent } from '../forms/multi-select/multi-select.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, SingleSelectComponent, MultiSelectComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @Input() id: string = 'quiz-zero';
  @Input() questionNumber: number | any = 0;
  @Input() question: string = '';
  @Input() images: string = '';
  @Input() correct: string | Array<string> = [];
  @Input() disabled: boolean = true;

  quizFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizFormGroup = this.fb.group({
      answer: new FormControl(''),
    });
  }

  isStringArray(value: any): boolean {
    return Array.isArray(value);
  }

  checkCorrectAnswer(input: string): boolean {
    return this.correct.includes(input);
  }
}
