import { ComponentFixture, TestBed } from '@angular/core/testing';

import Step1GeneralInfoComponentComponent from './step1-general-info-component.component';

describe('Step1GeneralInfoComponentComponent', () => {
  let component: Step1GeneralInfoComponentComponent;
  let fixture: ComponentFixture<Step1GeneralInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step1GeneralInfoComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Step1GeneralInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
