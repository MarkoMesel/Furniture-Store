import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Product } from '../../types';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  selectedQuantity: number = 1;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product, this.selectedQuantity);
  }
  
  editProduct(product: Product) {
    this.edit.emit(this.product);
  }

  deleteProduct(product: Product) {
    this.delete.emit(this.product);
  }
}
