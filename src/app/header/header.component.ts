import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from '../add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../types';
import { ProductService } from '../product.service';
import { ToggleService } from '../toggle.service';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  private subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private toggleService: ToggleService,
    private cartService: CartService
  ) {}

  showForm(): void {
    this.toggleService.toggleAddOrEditProductVisible(true);
    this.toggleService.toggleIsEditProduct(false);
  }

  ngOnInit(): void {
    this.subscription = this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
