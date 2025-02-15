import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2GalleryComponentComponent } from './step2-gallery-component.component';

describe('Step2GalleryComponentComponent', () => {
  let component: Step2GalleryComponentComponent;
  let fixture: ComponentFixture<Step2GalleryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step2GalleryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2GalleryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
