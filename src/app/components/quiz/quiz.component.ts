import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @Input() id: string = 'quiz-zero';
  @Input() questionNumber: number | undefined = 0;
  @Input() question: string = '';
  @Input() images: string = '';
  @Input() correct: string | Array<string> = [];
  @Input() disabled: boolean = true;
  @Input() isPA: boolean = true;

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
