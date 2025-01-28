import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from "../add-product/add-product.component";
import { CommonModule } from '@angular/common';
import { Product } from '../../types';
import { ProductService } from '../product.service';
import { ToggleService } from '../toggle.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private productService: ProductService, private toggleService: ToggleService) {}

  showForm(): void {
    this.toggleService.toggleAddProduct(true);
    this.toggleService.toggleIsEditProduct(false);
  }
}
