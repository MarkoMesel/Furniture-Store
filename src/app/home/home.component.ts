import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../product.service';
import { Product } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts('http://localhost:3000/products', {}).subscribe((products) => {
      this.products = products.items;
      console.log(products.items);
    })
  }
}
