import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Add product with a given quantity
  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex(item => item.product.id === product.id);

    if (index !== -1) {
      // Product is already in the cart, so update the quantity.
      // Make sure not to exceed the available stock.
      const newQuantity = Math.min(
        currentItems[index].quantity + quantity,
        product.stock
      );
      currentItems[index].quantity = newQuantity;
      this.cartItemsSubject.next([...currentItems]);
    } else {
      // New product; add it to the cart
      const newCartItem: CartItem = {
        product,
        quantity: Math.min(quantity, product.stock)
      };
      this.cartItemsSubject.next([...currentItems, newCartItem]);
    }
  }

  removeItem(productId: number) {
    const currentItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(currentItems);
  }
}