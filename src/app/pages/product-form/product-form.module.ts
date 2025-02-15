import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFormRoutingModule } from './product-form-routing.module';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Step1GeneralInfoComponent } from './step1-general-info-component/step1-general-info-component.component';
import { Step2GalleryComponent } from './step2-gallery-component/step2-gallery-component.component';
import { Step3HeroComponent } from './step3-hero-component/step3-hero-component.component';
import { Step4PriceCategoryComponent } from './step4-price-category-component/step4-price-category-component.component';
import { ProductPreviewComponent } from './product-preview-component/product-preview-component.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    Step1GeneralInfoComponent,
    Step2GalleryComponent,
    Step3HeroComponent,
    Step4PriceCategoryComponent,
    ProductPreviewComponent,
  ],
  imports: [CommonModule, ProductFormRoutingModule, ReactiveFormsModule],
  exports: [ProductFormComponent],
})
export class ProductFormModule {}
