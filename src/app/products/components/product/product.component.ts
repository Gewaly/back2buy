import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() data: any = {};
  @Output() addToCart = new EventEmitter();

  add() {
    this.addToCart.emit(this.data);
  }
}
