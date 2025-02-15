import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iCategory } from '../../../interfaces/i-category';
import { ProductFormService } from '../../../services/product-form.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-step4-price-category-component',
  templateUrl: './step4-price-category-component.component.html',
  styleUrl: './step4-price-category-component.component.scss',
})
export class Step4PriceCategoryComponent {
  priceCategoryForm: FormGroup;
  categories: iCategory[] = [];
  newCategoryForm: FormGroup;

  @ViewChild('categorySelect') categorySelect!: ElementRef;

  constructor(
    private formService: ProductFormService,
    private categorySvc: CategoryService,
    private fb: FormBuilder
  ) {
    this.priceCategoryForm = this.formService.productForm.get(
      'priceCategory'
    ) as FormGroup;
    this.newCategoryForm = this.fb.group({
      category: ['', Validators.required],
    });
    this.getCategories();
  }

  getCategories(): void {
    this.categorySvc.getAllCategory().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Errore nel recupero delle categorie', err),
    });
  }

  newCategorySubmit(): void {
    const categoryValue = this.newCategoryForm.get('category')?.value;
    this.categorySvc.createCategory(categoryValue.toLowerCase()).subscribe({
      next: (result) => {
        this.categories.push(result);
      },
      error: (err) =>
        console.error('Errore nella creazione della categoria', err),
    });
  }
}
