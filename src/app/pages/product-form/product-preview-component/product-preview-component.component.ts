import { Component } from '@angular/core';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-product-preview-component',
  templateUrl: './product-preview-component.component.html',
  styleUrl: './product-preview-component.component.scss',
})
export class ProductPreviewComponent {
  formValue: any;

  constructor(public formService: ProductFormService) {
    // prendo i dati del form per mostrare l'anteprima
    this.formValue = this.formService.getFormValue();
  }
}
