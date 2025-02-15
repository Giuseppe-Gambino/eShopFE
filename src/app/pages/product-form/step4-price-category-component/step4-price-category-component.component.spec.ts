import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4PriceCategoryComponentComponent } from './step4-price-category-component.component';

describe('Step4PriceCategoryComponentComponent', () => {
  let component: Step4PriceCategoryComponentComponent;
  let fixture: ComponentFixture<Step4PriceCategoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step4PriceCategoryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4PriceCategoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
