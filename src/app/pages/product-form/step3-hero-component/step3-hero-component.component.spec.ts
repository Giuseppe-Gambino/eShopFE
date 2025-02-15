import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3HeroComponentComponent } from './step3-hero-component.component';

describe('Step3HeroComponentComponent', () => {
  let component: Step3HeroComponentComponent;
  let fixture: ComponentFixture<Step3HeroComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step3HeroComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3HeroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
