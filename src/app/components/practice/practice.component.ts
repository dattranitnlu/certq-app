import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { CERT_API_LIST, PROVIDER_DATA_API } from '../../constants/api.constant';
import { Router } from '@angular/router';
import { pathUrl } from '../../app.routes';
import { QuizComponent } from '../quiz/quiz.component';

interface Provider {
  provider: string;
  exams: string[];
}

interface Question {
  title: string;
  question: string;
  images: string;
  options: string[];
  correct: string | string[];
  questionNumber: number;
  text: string;
  statements?: Statement[];
}

interface Statement {
  text: string;
  userAnswer?: string;
  isCorrect?: boolean;
  correct?: string;
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuizComponent,
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
})
export class PracticeComponent implements OnInit {
  data: Provider[] = [];
  questionsData: Question[] = [];
  selectedExams: string[] | undefined = [];
  count: number = 51; // The number random questions in a exam.
  confident: number = 85; // (%)

  quizForm: FormGroup = this.fb.group({
    quizzes: this.fb.array([]),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.http.get<Provider[]>(PROVIDER_DATA_API).subscribe((res) => {
      this.data = res;
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

  loadQuestions(event: Event): void {
    const selectedExam = (event.target as HTMLSelectElement).value;

    this.http.get<Question[]>(this.getApiUrl(selectedExam)).subscribe({
      next: (data) => {
        this.questionsData = this.getRandomQuestions(this.count, data);
        console.log('questionData = ', this.questionsData);
        this.quizForm = this.fb.group({
          quizzes: this.fb.array(this.generateQuizFormGroups(this.questionsData)),
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error) this.router.navigate([pathUrl.commingSoon]);
      },
    });
  }

  getApiUrl(certName: string): string {
    const certObj = CERT_API_LIST.find((item) => item.cert === certName);
    return certObj ? certObj.url : '';
  }

  getRandomQuestions(count: number, questionList: Question[]): Question[] {
    if (
      questionList &&
      questionList.length > 0 &&
      questionList.length >= count
    ) {
      const shuffled = questionList.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } else {
      return [];
    }
  }

  generateQuizFormGroups(questions: Question[]): any {
    if (questions && questions.length > 0) {
      return questions.map((question) =>
        this.fb.group({
          question: [question.question],
          questionNumber: [question.questionNumber],
          images: [question.images],
          options: [question.options],
          correct: [question.correct],
        })
      );
    } else {
      return this.fb.group({});
    }
  }

  onSubmit(): void {
    console.log('data = ', this.quizForm);
  }
}
