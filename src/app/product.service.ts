import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Products } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getProducts = (url: string, params: any): Observable<Products> => {
    return this.apiService.get(url, params);
  }

  addProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {headers: {
      'Content-Type': 'application/json'
    }});
  };

  editProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
