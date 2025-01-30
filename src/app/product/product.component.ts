import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Product } from '../../types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  
  editProduct(product: Product) {
    this.edit.emit(this.product);
  }

  deleteProduct(product: Product) {
    this.delete.emit(this.product);
  }
}
