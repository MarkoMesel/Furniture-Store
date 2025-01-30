import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private addOrEditProductVisibleSubject = new BehaviorSubject<boolean>(false);
  private isEditProductFormSubject = new BehaviorSubject<boolean>(false);
  addOrEditVisible$ = this.addOrEditProductVisibleSubject.asObservable();
  isEditProductForm$ = this.isEditProductFormSubject.asObservable();;

  toggleAddOrEditProductVisible(state: boolean) {
    this.addOrEditProductVisibleSubject.next(state);
  }

  toggleIsEditProduct(state: boolean) {
    this.isEditProductFormSubject.next(state);
  }
}