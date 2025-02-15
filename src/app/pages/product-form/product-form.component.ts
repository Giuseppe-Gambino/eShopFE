import { Component, OnInit } from '@angular/core';
import { iProductRequest } from '../../interfaces/i-product-request';
import { ProductFormService } from '../../services/product-form.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  currentStep: number = 0;
  steps = [
    'Informazioni Generali',
    'Galleria',
    'Hero/Feature',
    'Prezzo e Categoria',
    'Preview',
  ];

  primaImgSelected!: File;
  secondaImgSelected!: File;
  selectedFiles: File[] = [];
  productId!: number;

  constructor(
    public formService: ProductFormService,
    private productSvc: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.productSvc
      .getProductById(parseInt(id))
      .subscribe((product) => this.formService.patchProduct(product));
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // per recuperare le immagini selezionate
  onGalleryImagesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onHeroImagesSelected(event: { prima: File; seconda: File }): void {
    this.primaImgSelected = event.prima;
    this.secondaImgSelected = event.seconda;
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
        this.productId = product.id;
        this.patchImgs();
        //   caricamento immagini
      },
      error: (err) => {
        console.error('Errore nella creazione del prodotto:', err);
      },
    });
  }

  patchImgs(): void {
    const images: File[] = [];
    images.push(...this.selectedFiles);
    if (this.primaImgSelected) {
      images.push(this.primaImgSelected);
    }
    if (this.secondaImgSelected) {
      images.push(this.secondaImgSelected);
    }

    this.productSvc.addImgs(this.productId, images).subscribe({
      next: (response) => {
        console.log('Immagini caricate:', response);
      },
      error: (err) => {
        console.error("Errore nell'upload delle immagini:", err);
      },
    });
  }
}
