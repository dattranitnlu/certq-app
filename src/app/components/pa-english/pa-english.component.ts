import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { CERT_API_LIST } from '../../constants/api.constant';
import { Router } from '@angular/router';
import { pathUrl } from '../../app.routes';
import { QuizComponent } from '../quiz/quiz.component';
import { Provider, Question } from '../../models/models.interface';
import { SingleSelectComponent } from '../forms/single-select/single-select.component';
import { ConfettiService } from '../../services/confetti.service';

@Component({
  selector: 'app-pa-english',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuizComponent,
    SingleSelectComponent,
  ],
  templateUrl: './pa-english.component.html',
  styleUrl: './pa-english.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaEnglishComponent {
  data: Provider[] = [];
  questionsData: Question[] = [];
  selectedExams: string[] | undefined = [];
  count: number = 51; // The number random questions in a exam.
  confident: number = 85; // (%)

  // Variables for forms.
  fillForm: boolean = false;
  disableForm: boolean = false;
  resetForm: boolean = false;

  quizForm: FormGroup = this.fb.group({
    quizzes: this.fb.array([]),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private confettiService: ConfettiService
  ) {}

  ngOnInit() {
    this.http.get<Question[]>(this.getApiUrl('PA English Part 5')).subscribe({
      next: (data) => {
        this.questionsData.push(...data);
        const newGroups = this.generateQuizFormGroups(data);
        newGroups.forEach((group: any) => this.quizzes.push(group));
      },
      error: (error: HttpErrorResponse) => {
        if (error) this.router.navigate([pathUrl.commingSoon]);
      },
    });

    this.http.get<Question[]>(this.getApiUrl('PA English Part 7')).subscribe({
      next: (data) => {
        this.questionsData.push(...data);
        const newGroups = this.generateQuizFormGroups(data);
        newGroups.forEach((group: any) => this.quizzes.push(group));
        
      },
      error: (error: HttpErrorResponse) => {
        if (error) this.router.navigate([pathUrl.commingSoon]);
      },
    });
  }

  getExamValueDropdown(selectedProvider: string): string[] | undefined {
    const providerData = this.data.find(
      (item) => item.provider === selectedProvider
    );
    return providerData ? providerData.exams : undefined;
  }

  handleExamDropdown(event: Event) {
    const selectedProvider = (event.target as HTMLSelectElement).value;
    this.selectedExams = this.getExamValueDropdown(selectedProvider);
  }

  getApiUrl(certName: string): string {
    const certObj = CERT_API_LIST.find((item) => item.cert === certName);
    return certObj ? certObj.url : '';
  }

  generateQuizFormGroups(questions: Question[]): any {
    if (questions && questions.length > 0) {
      return questions.map((question) => {
        return this.fb.group({
          correct: [question.correct],
          option: new FormControl('', Validators.required),
        });
      });
    } else {
      return null;
    }
  }

  onSubmit(): void {
    this.disableForm = true;
    const score = this.calculateScore();
    console.log(`Số câu trả lời đúng là: ${score}`);

    if (score / this.questionsData.length * 100 >= 1) {
      setTimeout(() => {
        this.confettiService.showAlert();
        this.confettiService.celebrate();
      }, 450);
    }
  }

  onReset(): void {
    this.resetForm = true;
    this.fillForm = false;
    this.disableForm = false;
  }

  get quizzes() {
    return this.quizForm.controls['quizzes'] as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    const quiz: FormGroup = this.quizzes.at(questionIndex) as FormGroup;
    return quiz.get('options') as FormArray;
  }

  isStringArray(value: any): boolean {
    return Array.isArray(value);
  }

  checkCorrectAnswer(
    correct: string | Array<string> = [],
    input: string
  ): boolean {
    return correct.includes(input);
  }

  generateFormArray(question: Question): FormArray | undefined {
    if (!question.options || typeof question.options === undefined) {
      return this.fb.array([]);
    }

    if (question.options && question.options.length > 0) {
      return this.fb.array(
        question.options.map((option: any) => {
          if (!option) {
            return this.fb.control('');
          }

          return this.fb.control('');
        })
      );
    } else {
      return this.fb.array([]);
    }
  }

  logAny(obj: any): void {
    console.log('log = ', obj);
  }

  calculateScore(): number {
    let correctCount = 0;
    const quizzes = this.quizForm.get('quizzes') as FormArray;
    
    
    quizzes.controls.forEach((quiz: any) => {
      const correctAnswer: string = quiz.value.correct;
      const selectedAnswer: string = quiz.value.option;
      
      if (selectedAnswer === correctAnswer) {
        correctCount++;
      }
      
    });
  
    return correctCount;
  }
}
