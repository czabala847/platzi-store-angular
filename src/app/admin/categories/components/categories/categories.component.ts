import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.models';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'options'];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.categoriesService
      .getAll()
      .subscribe((data) => (this.categories = data));
  }
}
