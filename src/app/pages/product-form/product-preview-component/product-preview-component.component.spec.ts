import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewComponentComponent } from './product-preview-component.component';

describe('ProductPreviewComponentComponent', () => {
  let component: ProductPreviewComponentComponent;
  let fixture: ComponentFixture<ProductPreviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPreviewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPreviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
