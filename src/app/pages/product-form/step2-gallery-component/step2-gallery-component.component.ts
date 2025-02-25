import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-step2-gallery-component',
  templateUrl: './step2-gallery-component.component.html',
  styleUrl: './step2-gallery-component.component.scss',
})
export class Step2GalleryComponent implements OnInit {
  galleryForm: FormGroup;
  imgsArr: string[] = [];
  selectedFiles: File[] = [];

  constructor(private formService: ProductFormService) {
    this.galleryForm = this.formService.productForm.get('gallery') as FormGroup;
  }

  @Input() imgsFromProduct!: string[] | undefined;

  ngOnInit(): void {
    if (this.imgsFromProduct) {
      this.imgsArr = this.imgsFromProduct;
    }
    this.previewRefresh();
  }

  previewRefresh(): boolean {
    if (this.imgsArr.length === 0) {
      return true;
    }
    return false;
  }

  onMultiFileSelected(event: any) {
    const newFiles: File[] = Array.from(event.target.files);

    this.selectedFiles = [...this.selectedFiles, ...newFiles];

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imgsArr.push(reader.result as string);

        this.galleryForm.patchValue({
          selectedFiles: this.selectedFiles,
          imgsArr: this.imgsArr,
        });
      };
      reader.readAsDataURL(file);
    });

    this.previewRefresh();

    // console.log('File selezionati:', this.selectedFiles);
  }

  deleteImg(index: number) {
    this.imgsArr.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.galleryForm.patchValue({
      selectedFiles: this.selectedFiles,
      imgsArr: this.imgsArr,
    });
    // this.imagesSelected.emit(this.selectedFiles);

    this.previewRefresh();

    // console.log('File selezionati:', this.selectedFiles);
  }

  @ViewChild('scrollableElement') carousel!: ElementRef;

  scrollCarousel(type: number): void {
    if (this.carousel) {
      if (type === 0) {
        (this.carousel.nativeElement as HTMLElement).scrollLeft -= 200;
      } else {
        (this.carousel.nativeElement as HTMLElement).scrollLeft += 200;
      }
    }
  }

  scrolla(num: number): void {
    if (this.carousel) {
      (this.carousel.nativeElement as HTMLElement).scrollTo({
        left: num,
        behavior: 'smooth',
      });
    }
  }
}
