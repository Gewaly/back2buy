import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-products',
  imports: [
    CommonModule,
    SpinnerComponent,
    SelectComponent,
    ProductComponent,
    RouterModule,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  cartProducts: any[] = [];
  isLoading: boolean = false;
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }
  getAllProducts() {
    this.isLoading = true;
    this._ProductsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.isLoading = false;
      },

      error: (error: any) => alert('Error fetching products: ' + error.message),
    });
  }
  getAllCategories() {
    this.isLoading = true;
    this._ProductsService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        this.isLoading = false;
      },
      error: (error: any) =>
        alert('Error fetching categories: ' + error.message),
    });
  }
  onCategoryChange(event: any) {
    let value = event.target.value;

    if (value === 'all') {
      this.getAllProducts();

      return;
    }
    this.getProductsByCategory(value);
  }
  getProductsByCategory(category: string) {
    this.isLoading = true;

    this._ProductsService.getProductsByCategory(category).subscribe({
      next: (res: any) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (error: any) =>
        alert('Error fetching products by category: ' + error.message),
    });
  }
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
      let isExist = this.cartProducts.find(
        (item) => item.item.id === event.item.id
      );
      if (isExist) {
        alert('This product is already in the cart');
        return;
      }
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
