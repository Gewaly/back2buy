import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(appConfig.baseURL + 'products');
  }
  getAllCategories() {
    return this.http.get(appConfig.baseURL + 'products/categories');
  }
  getProductsByCategory(category: string) {
    return this.http.get(appConfig.baseURL + 'products/category/' + category);
  }
}
