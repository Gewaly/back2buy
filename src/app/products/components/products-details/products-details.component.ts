import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-products-details',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  isLoading: boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {
    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    console.log('Product ID:', this.id);
  }
  ngOnInit() {
    this.getProductById();
  }
  getProductById() {
    this.isLoading = true;
    this._ProductsService.getProductsById(this.id).subscribe(
      (res) => {
        this.isLoading = false;
        this.data = res;
        console.log('Product Details:', this.data);
      },
      (error) => {
        this.isLoading = false;
        alert('Error fetching product details: ' + error.message);
      }
    );
  }
}
