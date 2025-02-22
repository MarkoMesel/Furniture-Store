import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../types';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private subscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to the cartItems observable to get updates
    this.subscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Calculate the overall total price of the cart
  getTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  }

  removeFromCart(item: CartItem) {
    if (item.product.id == undefined) {
      return;
    }
    this.cartService.removeItem(item.product.id);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
