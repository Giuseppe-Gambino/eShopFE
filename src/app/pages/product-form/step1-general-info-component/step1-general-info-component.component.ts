import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-step1-general-info-component',
  templateUrl: './step1-general-info-component.component.html',
  styleUrl: './step1-general-info-component.component.scss',
})
export class Step1GeneralInfoComponent {
  generalForm: FormGroup;

  constructor(private formService: ProductFormService) {
    this.generalForm = this.formService.productForm.get('general') as FormGroup;
  }
}
