import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Category } from 'src/app/core/models/category.models';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories-smart',
  templateUrl: './categories-smart.component.html',
  styleUrls: ['./categories-smart.component.scss'],
})
export class CategoriesSmartComponent implements OnInit {
  categoryFound: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.get('id')) {
        this.getCategory(params.get('id'));
        console.log('found', this.categoryFound);
      }
    });

    // if (this.categoryId) {
    //   this.getCategory();
    //   this.nameField.setAsyncValidators(null);
    //   console.log('Eliminar validacion async');
    // } else {
    //   console.log('Colocar validacion async');
    //   this.nameField.setAsyncValidators(
    //     MyValidators.validateCategory(this.categoriesService)
    //   );
    // }

    // this.nameField.updateValueAndValidity();
  }

  private getCategory(id: string) {
    this.categoriesService.get(id).subscribe((category) => {
      this.categoryFound = category;
      // this.form.patchValue(category);
    });
  }

  handleUpdate(categoryDTO) {
    this.categoriesService
      .update(this.categoryFound._id, categoryDTO)
      .subscribe((response) => {
        this.router.navigate(['./admin/categories']);
      });
  }

  handleCreate(categoryDTO) {
    this.categoriesService.create(categoryDTO).subscribe((response) => {
      this.router.navigate(['./admin/categories']);
    });
  }
}
