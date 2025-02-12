import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { iProduct } from '../../../interfaces/i-product';
import { UserService } from '../../../services/user.service';
import { iUser } from '../../../interfaces/i-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { iCategory } from '../../../interfaces/i-category';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent implements OnInit {
  product!: iProduct;
  user!: iUser;
  category!: iCategory[];

  productForm!: FormGroup;

  newCategory!: string;

  primaImg!: string;
  secondaImg!: string;
  imgsArr: string[] = [];

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

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      titleSeconda: ['', Validators.required],
      descriptionSeconda: ['', Validators.required],
      titleTerza: ['', Validators.required],
      descriptionTerza: ['', Validators.required],
      price: [null, Validators.required],
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }

    this.getCategory();
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
    this.categorySvc.createCategory(this.newCategory.toLowerCase()).subscribe({
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
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (index === 1) {
        this.primaImg = reader.result as string;
      } else {
        this.secondaImg = reader.result as string;
      }
    };

    reader.readAsDataURL(file);
  }

  onMultiFileSelected(events: any): void {
    for (let e of events.target.files) {
      const file = e;
      const reader = new FileReader();

      reader.onload = () => {
        this.imgsArr.push(reader.result as string);
        // this.product.imageUrls.push(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }
}
