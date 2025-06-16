import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() data: any = {};
  @Output() addToCart = new EventEmitter();
  isAddToCart: boolean = true;
  amount: number = 0;

  add() {
    this.addToCart.emit({ item: this.data, quantity: this.amount });
  }
  toggleAddToCart() {
    this.isAddToCart = !this.isAddToCart;
  }
}
