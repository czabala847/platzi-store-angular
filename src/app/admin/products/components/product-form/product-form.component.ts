import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { MyValidators } from 'src/app/utils/validators';
import {
  ProductCreateDTO,
  Product,
  ProductUpdateDTO,
} from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  @Output() create = new EventEmitter<ProductCreateDTO>();
  @Output() update = new EventEmitter<ProductUpdateDTO>();
  @Input() set product(product: Product) {
    if (product) {
      console.log();
      this.isNew = false;
      this.form.patchValue(product);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(6)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      category_id: ['', [Validators.required]],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.min(10)]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }

      // this.productsService.createProduct(product).subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['./admin/products']);
      // });
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const image$ = fileRef.getDownloadURL();
          image$.subscribe((url) => {
            // console.log(url);
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

  get nameField() {
    return this.form.get('name');
  }

  get priceField() {
    return this.form.get('price');
  }

  get categoryField() {
    return this.form.get('category_id');
  }

  get imageField() {
    return this.form.get('image');
  }

  get descriptionField() {
    return this.form.get('description');
  }
}
