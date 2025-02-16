import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-step3-hero-component',
  templateUrl: './step3-hero-component.component.html',
  styleUrl: './step3-hero-component.component.scss',
})
export class Step3HeroComponent implements OnInit {
  heroForm: FormGroup;
  primaImg: string = '';
  primaImgSelected!: File;
  secondaImg: string = '';
  secondaImgSelected!: File;

  constructor(private formService: ProductFormService) {
    this.heroForm = this.formService.productForm.get('hero') as FormGroup;
  }

  @Input() primaImgFromProduct!: string | undefined;
  @Input() secondaImgFromProduct!: string | undefined;

  ngOnInit(): void {
    if (this.primaImgFromProduct && this.secondaImgFromProduct) {
      this.primaImg = this.primaImgFromProduct;
      this.secondaImg = this.secondaImgFromProduct;
    }
  }

  onFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (index === 1) {
        this.primaImg = reader.result as string;
        this.primaImgSelected = file;
      } else {
        this.secondaImg = reader.result as string;
        this.secondaImgSelected = file;
      }

      this.heroForm.patchValue({
        imgFile: [this.primaImgSelected, this.secondaImgSelected],
        imgString: [this.primaImg, this.secondaImg],
      });
    };
    reader.readAsDataURL(file);
  }

  deleteHeroImg(index: number): void {
    if (index === 1) {
      this.primaImg = '';
      this.primaImgSelected = new File([], '');
    } else {
      this.secondaImg = '';
      this.secondaImgSelected = new File([], '');
    }
    this.heroForm.patchValue({
      imgFile: [this.primaImgSelected, this.secondaImgSelected],
      imgString: [this.primaImg, this.secondaImg],
    });
  }
}
