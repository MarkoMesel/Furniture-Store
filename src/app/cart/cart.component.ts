import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../types';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
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

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
