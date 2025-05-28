import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
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
}
