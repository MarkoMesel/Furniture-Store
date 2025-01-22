import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private addProductVisibleSubject = new BehaviorSubject<boolean>(false);
  addProductVisible$ = this.addProductVisibleSubject.asObservable();

  toggleAddProduct(state: boolean) {
    this.addProductVisibleSubject.next(state);
  }
}