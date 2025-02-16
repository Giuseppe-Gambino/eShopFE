import { ProductFormService } from './../../services/product-form.service';
import { Component, OnInit } from '@angular/core';
import { iProductRequest } from '../../interfaces/i-product-request';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { iProduct } from '../../interfaces/i-product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  currentStep: number = 0;
  steps: number = 5;

  formPreview!: FormGroup;

  primaImgSelected!: File;
  secondaImgSelected!: File;
  selectedFiles: File[] = [];
  productId!: number;
  product!: iProduct;

  // imgUrls se siamo in put
  productImgsArr?: string[] = [];
  primaImg?: string;
  secondaImg?: string;

  constructor(
    public formService: ProductFormService,
    private productSvc: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formService.clearForm();
    this.formPreview = this.formService.productForm;
    console.log('Form:', this.formPreview.value);

    this.idIsPresent();
  }

  idIsPresent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.productSvc.getProductById(parseInt(id)).subscribe({
      next: (product) => {
        this.product = product;
        this.formService.patchProduct(product);
        this.productId = product.id;
      },
      error: (err) => console.error('Errore nel recupero del prodotto:', err),
    });
  }

  get PreviewData(): any {
    if (this.product) {
      return this.product;
    }
    const formValue = this.formPreview.value;
    return {
      imageUrls:
        this.productImgsArr && this.productImgsArr.length
          ? this.productImgsArr
          : ['https://placedog.net/500'],
      name: formValue.general?.name || '',
      description: formValue.general?.description || '',
      price: formValue.priceCategory?.price || 0,
    };
  }

  nextStep() {
    if (this.currentStep < this.steps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm() {
    const formValue = this.formService.getFormValue();

    const dto: iProductRequest = {
      name: formValue.general.name,
      description: formValue.general.description,
      titleSeconda: formValue.hero.titleSeconda,
      descriptionSeconda: formValue.hero.descriptionSeconda,
      titleTerza: formValue.hero.titleTerza,
      descriptionTerza: formValue.hero.descriptionTerza,
      price: formValue.priceCategory.price,
    };

    const categoryId = formValue.priceCategory.categoryId;
    this.productSvc.createProduct(parseInt(categoryId), dto).subscribe({
      next: (product) => {
        console.log('Prodotto creato:', product);
        this.patchImgs(product.id);
        //   caricamento immagini
      },
      error: (err) => {
        console.error('Errore nella creazione del prodotto:', err);
      },
    });
  }

  patchImgs(productId: number): void {
    const formValue = this.formService.getFormValue();
    const galleryImages: File[] = formValue.gallery.selectedFiles;
    const heroImages: File[] = formValue.hero.imgFile;

    const images: File[] = [];

    if (galleryImages && heroImages && heroImages.length >= 2) {
      galleryImages.push(heroImages[0], heroImages[1]);
    }

    images.push(...galleryImages);

    console.log('Immagini da caricare:', images);

    this.productSvc.addImgs(productId, images).subscribe({
      next: (response) => {
        console.log('Immagini caricate:', response);
      },
      error: (err) => {
        console.error("Errore nell'upload delle immagini:", err);
      },
    });
  }

  submitEditForm() {
    const formValue = this.formService.getFormValue();

    const dto: iProductRequest = {
      name: formValue.general.name,
      description: formValue.general.description,
      titleSeconda: formValue.hero.titleSeconda,
      descriptionSeconda: formValue.hero.descriptionSeconda,
      titleTerza: formValue.hero.titleTerza,
      descriptionTerza: formValue.hero.descriptionTerza,
      price: formValue.priceCategory.price,
    };

    this.productSvc.updateProductInfo(this.productId, dto).subscribe({
      next: (product) => {
        console.log('Prodotto aggiornato:', product);
      },
      error: (err) => {
        console.error('Errore nell aggiornamento del prodotto:', err);
      },
    });
  }
}
