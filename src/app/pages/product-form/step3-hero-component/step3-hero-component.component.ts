import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-step3-hero-component',
  templateUrl: './step3-hero-component.component.html',
  styleUrl: './step3-hero-component.component.scss',
})
export class Step3HeroComponent {
  heroForm: FormGroup;
  primaImg: string = '';
  primaImgSelected!: File;
  secondaImg: string = '';
  secondaImgSelected!: File;

  @Output() heroImagesSelected = new EventEmitter<{
    prima: File;
    seconda: File;
  }>();

  constructor(private formService: ProductFormService) {
    this.heroForm = this.formService.productForm.get('hero') as FormGroup;
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

      this.heroImagesSelected.emit({
        prima: this.primaImgSelected,
        seconda: this.secondaImgSelected,
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
    this.heroImagesSelected.emit({
      prima: this.primaImgSelected,
      seconda: this.secondaImgSelected,
    });
  }
}
