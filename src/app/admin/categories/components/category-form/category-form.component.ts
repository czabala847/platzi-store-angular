import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import {
  Category,
  CategoryUpdateDTO,
} from 'src/app/core/models/category.models';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.categoryId = params.get('id');
    });

    if (this.categoryId) {
      this.getCategory();
      // this.nameField.setAsyncValidators(null);
      // console.log('Eliminar validacion async');
    } else {
      // console.log('Colocar validacion async');
      // this.nameField.setAsyncValidators(
      //   MyValidators.validateCategory(this.categoriesService)
      // );
    }

    // this.nameField.updateValueAndValidity();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.required,
        MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      if (!this.categoryId) {
        this.createCategory();
      } else {
        this.updateCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateCategory() {
    const dto: CategoryUpdateDTO = this.form.value;
    this.categoriesService
      .update(this.categoryId, dto)
      .subscribe((response) => {
        this.router.navigate(['./admin/categories']);
      });
  }

  private createCategory() {
    const dto: Category = this.form.value;
    this.categoriesService.create(dto).subscribe((response) => {
      this.router.navigate(['./admin/categories']);
    });
  }

  private getCategory() {
    this.categoriesService.get(this.categoryId).subscribe((category) => {
      this.form.patchValue(category);
    });
  }

  handleUpload(event) {
    event.preventDefault();
    const element = event.target as HTMLInputElement;
    const image = element.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }
}
