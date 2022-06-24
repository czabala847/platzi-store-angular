import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Category,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from '../models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  create(dto: CategoryCreateDTO) {
    return this.http.post<Category>(`${environment.url_api}/categories`, dto);
  }

  update(id: string, dto: CategoryUpdateDTO) {
    return this.http.put<Category>(
      `${environment.url_api}/categories/${id}`,
      dto
    );
  }
}
