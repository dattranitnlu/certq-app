import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfQuizComponent } from './tf-quiz.component';

describe('TfQuizComponent', () => {
  let component: TfQuizComponent;
  let fixture: ComponentFixture<TfQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TfQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TfQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
