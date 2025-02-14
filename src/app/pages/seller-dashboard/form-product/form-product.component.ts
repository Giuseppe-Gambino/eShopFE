import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { iProduct } from '../../../interfaces/i-product';
import { UserService } from '../../../services/user.service';
import { iUser } from '../../../interfaces/i-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { iCategory } from '../../../interfaces/i-category';
import { iProductRequest } from '../../../interfaces/i-product-request';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent implements OnInit {
  product!: iProduct;
  productId!: number;
  user!: iUser;
  category!: iCategory[];

  ProductRequest!: iProductRequest;

  productForm!: FormGroup;

  newCategoryForm!: FormGroup;

  primaImg: string = '';
  primaImgSelected!: File;
  secondaImg: string = '';
  secondaImgSelected!: File;

  currentPage: number = 0;

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductsService,
    private categorySvc: CategoryService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productSvc.getProductById(parseInt(id)).subscribe({
      next: (product) => {
        this.product = product;
        console.log(this.product);
        this.formCreate();
      },
      error: (err) => {
        console.error('Errore nel recupero del prodotto', err);
      },
    });

    this.userSvc.getByUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
      error: (err) => {
        console.error("Errore nel recupero dell'utente", err);
      },
    });

    this.newCategoryForm = this.fb.group({
      category: ['', Validators.required],
    });

    this.getCategory();
  }

  formCreate() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      hero: this.fb.group({
        titleSeconda: ['', Validators.required],
        descriptionSeconda: ['', Validators.required],
        titleTerza: ['', Validators.required],
        descriptionTerza: ['', Validators.required],
      }),
      priceG: this.fb.group({
        price: [null, Validators.required],
      }),
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
      console.log(this.productForm.value);
    }
  }

  @ViewChild('categoryID') categoryID!: ElementRef;

  submit() {
    const idcategory = this.categoryID.nativeElement.value;
    const formData = this.productForm.value;
    this.ProductRequest = {
      name: formData.name,
      description: formData.description,
      titleSeconda: formData.hero.titleSeconda,
      descriptionSeconda: formData.hero.descriptionSeconda,
      titleTerza: formData.hero.titleTerza,
      descriptionTerza: formData.hero.descriptionTerza,
      price: formData.priceG.price,
    };

    console.log('dto', this.ProductRequest);
    console.log('id category', idcategory);

    this.productSvc
      .createProduct(parseInt(idcategory), this.ProductRequest)
      .subscribe({
        next: (product) => {
          this.productId = product.id;
          this.patchImgs();
          console.log(product);
        },
        error: (err) => {
          console.error('Errore nel creare il prodotto', err);
        },
      });
  }

  images: File[] = [];

  patchImgs(): void {
    this.images = this.selectedFiles;
    this.images.push(this.primaImgSelected);
    this.images.push(this.secondaImgSelected);

    this.productSvc.addImgs(this.productId, this.images).subscribe({
      next: (product) => {
        console.log(product);
      },
      error: (err) => {
        console.error('Errore nel aggiungere le immagini', err);
      },
    });
  }

  getCategory(): void {
    this.categorySvc.getAllCategory().subscribe({
      next: (category) => {
        this.category = category;
        console.log(this.category);
      },
      error: (err) => {
        console.error('Errore nel recupero delle categorie', err);
      },
    });
  }

  newCategorySubmit(): void {
    const categoryValue = this.newCategoryForm.get('category')?.value as string;
    this.categorySvc.createCategory(categoryValue.toLowerCase()).subscribe({
      next: (result) => {
        console.log(result);
        this.category.push(result);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore nel creare la categoria', err);
      },
    });
  }

  onFileSelected(event: any, index: number): void {
    const newfile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (index === 1) {
        this.primaImg = reader.result as string;
        this.primaImgSelected = newfile;
      } else {
        this.secondaImg = reader.result as string;
        this.secondaImgSelected = newfile;
      }
    };

    reader.readAsDataURL(newfile);
  }

  deleteHeroImg(index: number): void {
    const newFileEmpty = new File([], '');
    if (index === 1) {
      this.primaImg = '';
      this.primaImgSelected = newFileEmpty;
    } else {
      this.secondaImg = '';
      this.secondaImgSelected = newFileEmpty;
    }
  }

  // Array di stringhe per le preview
  imgsArr: string[] = [];

  // file dell'input
  selectedFiles: File[] = [];

  onMultiFileSelected(event: any) {
    const newFiles: File[] = Array.from(event.target.files);
    if (
      this.selectedFiles.length == 4 ||
      newFiles.length > 4 ||
      (this.selectedFiles.length == 4 && newFiles.length < 4)
    ) {
      alert('Massimo 4 immagini');
      return;
    }

    // Aggiunge i nuovi file ai precedenti senza duplicati
    this.selectedFiles = [...this.selectedFiles, ...newFiles].filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    for (let e of event.target.files) {
      const file = e;
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        if (!this.imgsArr.includes(result)) {
          this.imgsArr.push(result);
        }
      };

      reader.readAsDataURL(file);
    }

    console.log('File selezionati:', this.selectedFiles);
  }

  deleteImg(index: number): void {
    this.imgsArr.splice(index, 1);
    this.selectedFiles.splice(index, 1);

    this.isEmpty();

    console.log('File selezionati:', this.selectedFiles);
  }

  isEmpty(): boolean {
    return this.selectedFiles.length === 0;
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

  incrementa(): void {
    this.currentPage++;
  }

  decrementa(): void {
    if (this.currentPage === 0) {
      return;
    }
    this.currentPage--;
  }
}
